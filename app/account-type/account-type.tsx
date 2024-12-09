"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  dropAccountTypes,
  getAllAccountTypes,
} from "@/actions/account-type.actions";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function AccountsTypes() {
  const queryClient = useQueryClient();
  const { data: accountsTypes } = useQuery({
    queryKey: ["accountsTypes"],
    queryFn: async () => await getAllAccountTypes(),
  });

  const dropMutation = useMutation({
    mutationFn: dropAccountTypes,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["accountsTypes"] });
    },
  });

  return (
    <Card className={"p-2 min-w-[40rem] max-h-[700px]"}>
      <CardHeader>
        <CardTitle>État Type de compte</CardTitle>
        {/*<Button variant={"destructive"} onClick={() => dropMutation.mutate()}>*/}
        {/*  Drop table*/}
        {/*</Button>*/}
        <CardDescription>Liste des différents types de compte</CardDescription>
      </CardHeader>
      <div className={"w-full overflow-y-auto max-h-[550px]"}>
        <Table className={"w-full"}>
          <TableHeader className={"w-full"}>
            <TableRow className={"w-full"}>
              <TableHead className={"w-[100px] text-center"}>id</TableHead>
              <TableHead className={"flex-grow text-center"}>Label</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className={"w-full"}>
            {accountsTypes?.length ? (
              accountsTypes.map((accountType) => (
                <TableRow key={accountType.id}>
                  <TableCell className={"w-[100px] text-center"}>
                    {accountType.id}
                  </TableCell>
                  <TableCell className={"flex-grow"}>
                    {accountType.label}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={2} className={"w-full text-center"}>
                  Aucun type de compte
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}
