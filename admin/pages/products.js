import Layout from "@/Components/Layout";
import Link from "next/link"


export default function Products()
{
return (
    <Layout>
        
<Link className="bg-blue-900 text-white py-1 px-2 rounded-md" href={'/products/new'}>Add new Product
</Link>
    </Layout>
)
}