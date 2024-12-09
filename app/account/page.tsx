import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import Accounts from "@/app/account/accounts";
import { getAllAccounts } from "@/actions/account.actions";
import { AccountForm } from "@/components/custom-form/account-form";
import { CardFormWrapper } from "@/components/card-form-wrapper";

export default async function AccountsPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["accounts"],
    queryFn: getAllAccounts,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div
        className={
          "w-full h-full flex items-center justify-center gap-x-6 mx-4"
        }
      >
        <CardFormWrapper
          title={"Formulaire Compte"}
          description={"Permet de renseigner les comptes utilisateurs."}
        >
          <AccountForm />
        </CardFormWrapper>
        <Accounts />
      </div>
    </HydrationBoundary>
  );
}
