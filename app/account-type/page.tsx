import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getAllAccountTypes } from "@/actions/account-type.actions";
import { CardFormWrapper } from "@/components/card-form-wrapper";
import { AccountTypeForm } from "@/components/custom-form/account-type-form";
import AccountsTypes from "@/app/account-type/account-type";

export default async function AccountTypePage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["accountsTypes"],
    queryFn: getAllAccountTypes,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div
        className={
          "w-full h-full flex items-center justify-center gap-x-6 mx-4"
        }
      >
        <CardFormWrapper
          title={"Formulaire Type de compte"}
          description={"Permet de renseigner les différents types de compte."}
        >
          <AccountTypeForm />
        </CardFormWrapper>
        <AccountsTypes />
      </div>
    </HydrationBoundary>
  );
}
