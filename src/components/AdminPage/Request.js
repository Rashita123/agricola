import { EachRequest } from "./EachRequest";
export const Request = ({
  setModalInfo,
  pendingRequests,
  removeKycRequest,
}) => {
  return (
    <div class="flex flex-col">
      <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="py-2 w-1/2 align-middle inline-blocksm:px-6 lg:px-8">
          <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg w-fit">
            <table class="divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <td class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User ID
                  </td>
                  <td class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </td>
                  <td class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Vote
                  </td>
                </tr>
              </thead>
              <tbody class="min-w-full">
                {pendingRequests.map((request, id) => {
                  return (
                    <EachRequest
                      key={id}
                      request={request}
                      setModalInfo={setModalInfo}
                      removeKycRequest={removeKycRequest}
                    />
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
