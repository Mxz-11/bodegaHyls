import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const grapeData = [
  { variety: "Cabernet Sauvignon" },
  { variety: "Merlot" },
  { variety: "Tempranillo" },
  { variety: "Chardonnay" },
]

export function GrapeTable() {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="bg-gray-100">Variedad</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {grapeData.map((grape, index) => (
            <TableRow key={index}>
              <TableCell>{grape.variety}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
