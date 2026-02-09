interface Product {
    name: string;
    views: (index: string) => void;
    save: (index: string) => void;
    edits: (index: string) => void;
    deleteProduct: (index: string) => void;
}

export default function Product({ name, views, save, edits, deleteProduct}: Product){
    return (
        <div className=" flex items-center justify-center  h-screen bg-gray-100  opacity-50 text-black buttons">
            <h1>{name}</h1>
        </div>
    );
}