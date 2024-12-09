"use client";

import { useQuery } from "@tanstack/react-query";
import { getAllAccounts } from "@/actions/account.actions";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function Accounts() {
  const { data: accounts } = useQuery({
    queryKey: ["accounts"],
    queryFn: async () => await getAllAccounts(),
  });

  return (
    <Card className={"p-2 min-w-[40rem] max-h-[700px]"}>
      <CardHeader>
        <CardTitle>État Compte</CardTitle>
        <CardDescription>
          Liste des différents comptes utilisateurs
        </CardDescription>
      </CardHeader>
      <div className={"w-full overflow-y-auto max-h-[550px]"}>
        <Table className={"w-full"}>
          <TableHeader className={"w-full"}>
            <TableRow className={"w-full"}>
              <TableHead className={"flex-grow"}>Email</TableHead>
              <TableHead className={"w-[150px] text-center"}>
                Type de compte
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className={"w-full"}>
            {accounts?.length ? (
              accounts.map((account) => (
                <TableRow key={account.email}>
                  <TableCell className={"flex-grow"}>{account.email}</TableCell>
                  <TableCell className={"w-[150px] text-center"}>
                    {account.accountTypeId}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={2} className={"w-full text-center"}>
                  Aucun compte
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}
