const Table = ({ headers, rows, onEdit, onDelete, onView }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse border border-gray-300 dark:border-gray-600">
        <thead className="bg-gray-100 dark:bg-gray-700">
          <tr>
            {headers.map((header, index) => (
              <th
                key={header}
                className="px-4 py-2 text-left text-gray-800 dark:text-gray-100 border border-gray-300 dark:border-gray-600"
              >
                {header}
              </th>
            ))}
            <th className="px-4 py-2 text-left text-gray-800 dark:text-gray-100 border border-gray-300 dark:border-gray-600">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr
              key={row?.id}
              className="odd:bg-white even:bg-gray-50 dark:odd:bg-gray-800 dark:even:bg-gray-700"
            >
              {/* {Object.values(row).map((value, idx) => (
                <td
                  key={idx}
                  className="px-4 py-2 text-gray-800 dark:text-gray-100 border border-gray-300 dark:border-gray-600"
                >
                  {value}
                </td>
              ))} */}
              <td
                key={row?.id+'title'}
                className="px-4 py-2 text-gray-800 dark:text-gray-100 border border-gray-300 dark:border-gray-600"
              >
                {row?.title}
              </td>
              <td
                key={row?.id+'desc'}
                className=" px-4 py-2 text-gray-800 dark:text-gray-100 border border-gray-300 dark:border-gray-600"
              >
                {row?.description}
              </td>
              <td
                key={row?.id+'effort'}
                className="px-4 py-2 text-gray-800 dark:text-gray-100 border border-gray-300 dark:border-gray-600"
              >
                {row?.effortToComplete}
              </td>
              <td
                key={row?.id+'due'}
                className="px-4 py-2 text-gray-800 dark:text-gray-100 border border-gray-300 dark:border-gray-600"
              >
                {row?.dueDate}
              </td>

              <td className="flex content-center justify-around h-full gap-1  py-[10%] text-gray-800 dark:text-gray-100 border border-gray-300 dark:border-gray-600">
                <button
                  id={row?.id}
                  onClick={() => onView(row?.id)}
                  className="px-3 my-[auto] py-1 text-sm font-medium text-white bg-green-500 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-800"
                >
                  View
                </button>
                <button
                  id={row?.id}
                  onClick={() => onEdit(row.id)}
                  className="px-3 py-1 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-800"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(row.id)}
                  className="px-3 py-1 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-800"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default Table;
