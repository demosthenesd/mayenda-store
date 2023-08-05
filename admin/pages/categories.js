import Layout from "../Components/Layout";
import { useEffect, useState } from "react";
import axios from "axios";
import { withSwal } from "react-sweetalert2";

function Categories({ swal }) {
  const [editedCategory, setEditedCategory] = useState(null);
  const [name, setName] = useState("");
  const [parentCategory, setParentCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  function fetchCategories() {
    axios.get("/api/categories").then((res) => {
      setCategories(res.data);
    });
  }

  async function saveCategory(ev) {
    ev.preventDefault();
    const data = {
      name,
      parentCategory,
      properties: properties.map((property) => ({
        name: property.name,
        values: property.values.split(","),
      })),
    };

    if (editedCategory) {
      data._id = editedCategory._id;
      await axios.put("/api/categories", data);
      setEditedCategory(null);
    } else {
      await axios.post("/api/categories", data);
    }

    setParentCategory("");
    setProperties([]);
    setName("");
    fetchCategories();
  }

  function editCategory(category) {
    setEditedCategory(category);
    setName(category.name);
    setParentCategory(category.parent?._id);
    setProperties(
      category.properties.map(({ name, values }) => ({
        name,
        values: values.join(","),
      }))
    );
  }

  function deleteCategory(category) {
    swal
      .fire({
        title: "Are you sure?",
        text: `Do you want to delete ${category.name}?`,
        showCancelButton: true,
        confirmButtonText: "Delete",
        confirmButtonColor: "#d55",
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          const { _id } = category;
          await axios.delete("/api/categories?_id=" + _id);
          fetchCategories();
        }
      });
  }

  function addProperty() {
    setProperties((prev) => {
      return [...prev, { name: "", values: "" }];
    });
  }

  function handlePropertyNameChange(index, property, newName) {
    setProperties((prev) => {
      const properties = [...prev];
      properties[index].name = newName;
      return properties;
    });
  }

  function handlePropertyValuesChange(index, property, newValues) {
    setProperties((prev) => {
      const properties = [...prev];
      properties[index].values = newValues;
      return properties;
    });
  }

  function removeProperty(indexToRemove) {
    setProperties((prev) => {
      return [...prev].filter((property, propertyIndex) => {
        return propertyIndex !== indexToRemove;
      });
    });
  }

  return (
    <Layout>
      <h1>Categories</h1>
      <label>
        {editedCategory
          ? `Edit category: ${editedCategory.name}`
          : "Create New Category"}{" "}
      </label>
      <form onSubmit={saveCategory}>
        <div className="flex gap-1">
          key={name}
          <input
            type="text"
            placeholder={"Category name"}
            onChange={(ev) => setName(ev.target.value)}
            value={name}
          />
          <select
            onChange={(ev) => setParentCategory(ev.target.value)}
            value={parentCategory}
          >
            <option value="">No parent category</option>
            {categories.length > 0 &&
              categories.map((category) => (
                <option key={category?._id} value={category?._id}>
                  {category?.name}
                </option>
              ))}
          </select>
        </div>
        <div className="mb-2">
          <label className="block">Properties</label>
          <button
            type="button"
            onClick={addProperty}
            className="btn-default text-sm mb-2"
          >
            Add new property
          </button>
          {properties.length > 0
            ? properties?.map((property, index) => (
                <div className="flex gap-1 mb-2" key={property.name}>
                  <input
                    className="mb-0"
                    type="text"
                    value={property.name}
                    onChange={(ev) =>
                      handlePropertyNameChange(index, property, ev.target.value)
                    }
                    placeholder="property name (Example:color)"
                  />
                  <input
                    className="mb-0"
                    key={property.values}
                    type="text"
                    value={property.values}
                    onChange={(ev) =>
                      handlePropertyValuesChange(
                        index,
                        property,
                        ev.target.value
                      )
                    }
                    placeholder="values, comma separated"
                  />
                  <button
                    onClick={() => removeProperty(index)}
                    type="button"
                    className="btn-red text-sm"
                    key={index}
                  >
                    Remove
                  </button>
                </div>
              ))
            : null}
        </div>
        <div className="flex gap-1">
          {editedCategory ? (
            <button
              type="button"
              onClick={() => {
                setEditedCategory(null);
                setName("");
                setParentCategory("");
                setProperties([]);
              }}
              className="btn btn-default py-1 mt-1"
            >
              Cancel
            </button>
          ) : null}

          <button type="submit" className="btn btn-primary py-1 mt-1">
            Save
          </button>
        </div>
      </form>

      {!editedCategory ? (
        <table className="basic mt-4">
          <thead>
            <tr key="headers">
              <td>Category name</td>
              <td>Parent Category</td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {categories.length > 0
              ? categories.map((category) => (
                  <tr key={category?._id}>
                    <td>{category?.name}</td>
                    <td>{category?.parent?.name}</td>
                    <td>
                      <button
                        onClick={() => editCategory(category)}
                        className="btn-primary text-sm  mr-1"
                        key="edit"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteCategory(category)}
                        className="btn-red text-sm"
                        key="delete"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              : null}
          </tbody>
        </table>
      ) : null}
    </Layout>
  );
}

export default withSwal(({ swal }, ref) => <Categories swal={swal} />);
