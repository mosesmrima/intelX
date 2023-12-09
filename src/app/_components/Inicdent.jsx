import {Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, getKeyValue} from "@nextui-org/react";

export default function Incident({incidents}) {

    const columns = [
        {
            key: "discovered",
            label: "Date"
        },
        {
            key: "post_title",
            label: "Title"
        },
        {
            key: "group",
            label: "Group"
        }
    ]
    return (
        <Table isStriped={true} aria-label="Example table with dynamic content">
            <TableHeader columns={columns}>
                {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
            </TableHeader>
            <TableBody items={incidents}>
                {(item) => (
                    <TableRow key={item._id}>
                        {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
}