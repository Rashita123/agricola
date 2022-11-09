export const EachLoan = ({ request }) => {
  const loanRepayHandler = (event) => {
    event.preventDefault();
    console.log(request);
  };
  const loadDetailsHandler = () => {};

  return (
    <tr class="bg-white w-full">
      <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 overflow-ellipsis w-1">
        {/* {{user}} */}
        {request.loan}
      </td>
      <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 overflow-ellipsis w-1">
        {/* {{status}} */}
        {request.dueDate}
      </td>
      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        <div className="cursor-pointer" onClick={loadDetailsHandler}>
          Details
        </div>
      </td>
      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        <button className="" onClick={loanRepayHandler}>
          Repay
        </button>
      </td>
    </tr>
  );
};
