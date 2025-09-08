export default function MyComponent() {
    return (
        <table className="w-full">
            <thead className="hidden md:table-header-group">
                <tr>
                    <th className="border p-2 text-left">Nombre</th>
                    <th className="border p-2 text-left">Edad</th>
                    <th className="border p-2 text-left">Ciudad</th>
                </tr>
            </thead>

            <tbody>
                <tr className="block border rounded-lg mb-4 p-3 md:table-row md:border-0 md:rounded-none md:p-0">
                    <td className="flex justify-between border-b py-2 md:table-cell md:border md:p-2 md:justify-start">
                        <span className="font-bold md:hidden">Nombre:</span>
                        Ana
                    </td>
                    <td className="flex justify-between border-b py-2 md:table-cell md:border md:p-2 md:justify-start">
                        <span className="font-bold md:hidden">Edad:</span>
                        25
                    </td>
                    <td className="flex justify-between py-2 md:table-cell md:border md:p-2 md:justify-start">
                        <span className="font-bold md:hidden">Ciudad:</span>
                        Madrid
                    </td>
                </tr>


                <tr className="block border rounded-lg mb-4 p-3 md:table-row md:border-0 md:rounded-none md:p-0">
                    <td className="flex justify-between border-b py-2 md:table-cell md:border md:p-2 md:justify-start">
                        <span className="font-bold md:hidden">Nombre:</span>
                        Carlos
                    </td>
                    <td className="flex justify-between border-b py-2 md:table-cell md:border md:p-2 md:justify-start">
                        <span className="font-bold md:hidden">Edad:</span>
                        30
                    </td>
                    <td className="flex justify-between py-2 md:table-cell md:border md:p-2 md:justify-start">
                        <span className="font-bold md:hidden">Ciudad:</span>
                        Barcelona
                    </td>
                </tr>
            </tbody>
        </table>
    );
};
