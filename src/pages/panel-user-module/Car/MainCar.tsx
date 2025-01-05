import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Table } from "lucide-react";

export default function MainCar() {

  return (
    <>
      <div className="pt-10 bg-white">
        <Card>

          <CardHeader>

          </CardHeader>

          <CardContent>
            <Table>

            </Table>
            {/* <PaginationTableCustom table={table} /> */}
          </CardContent>

        </Card>
      </div>
    </>
  )
}

async function getListCar() {

  try {
    const dataSession = JSON.parse(localStorage.getItem('sessionData') ?? '{}');
    const response: Response = await fetch(`${import.meta.env.VITE_API}/car`, {
      headers: { 
        "Content-Type": "application/json",
        "Authorization": dataSession.token
       },
    });

    const data = response.json();

    console.log(data);

  } catch (error) {
    console.log(error);
  }

}