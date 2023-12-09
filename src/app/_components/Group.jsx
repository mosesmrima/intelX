import {
    Card,
    CardBody,
    CardHeader,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
    Chip
} from "@nextui-org/react";

export default function Group({group}) {
    let data = group.locations.map(obj => ({
        title: obj.title,
        _id: obj._id,
        slug: obj.slug,
        available: obj.available,
        lastScrape: new Date(obj.lastScrape).toISOString().split('T')[0]
    }));

    const columns = [
        { key: "title", label: "Page Title" },
        { key: "lastScrape", label: "Last Scrape" },
        { key: "slug", label: "URL" },
        { key: "available", label: "Available" },
    ];

    const renderCell = (item, columnKey) => {
        const cellValue = item[columnKey];

        if (columnKey === "available") {
            return (
                <Chip
                    color={cellValue ? "success" : "danger"}
                    size="sm"
                    variant="flat"
                >
                    {cellValue ? "Online" : "Offline"}
                </Chip>
            );
        }

        return cellValue;
    };

    return (
        <div>
            <Card>
                <CardHeader className={"capitalize text-2xl px-4"}>
                    {group.name}
                </CardHeader>
                <CardBody>
                    <Table aria-label="Example table with dynamic content">
                        <TableHeader columns={columns}>
                            {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
                        </TableHeader>

                        <TableBody items={data}>
                            {(item) => (
                                <TableRow key={item._id}>
                                    {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardBody>
            </Card>
        </div>
    );
}
