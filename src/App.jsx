// import { useState } from "react";

// function App() {
//   const [count, setCount] = useState(0);

//   return (
//     <div className="min-h-screen bg-gray-50 p-4 md:p-8">
//       {/* Dashboard Cards */}
//       <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//         <div className="bg-indigo-100 p-6 rounded-xl shadow hover:shadow-lg transition duration-300">
//           <div className="text-3xl font-bold text-indigo-800">10</div>
//           <div className="mt-2 text-lg text-indigo-700">New Orders</div>
//         </div>

//         <div className="bg-orange-100 p-6 rounded-xl shadow hover:shadow-lg transition duration-300">
//           <div className="text-3xl font-bold text-orange-800">5</div>
//           <div className="mt-2 text-lg text-orange-700">Pending Deliveries</div>
//         </div>

//         <div className="bg-green-100 p-6 rounded-xl shadow hover:shadow-lg transition duration-300">
//           <div className="text-3xl font-bold text-green-800">3</div>
//           <div className="mt-2 text-lg text-green-700">New Users</div>
//         </div>
//       </div>

//       {/* Add Customer Button */}
//       <div className="mt-8 flex justify-center">
//         <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg shadow">
//           Add New Customer
//         </button>
//       </div>

//       {/* Recent Orders Table */}
//       <div className="mt-10 max-w-7xl mx-auto">
//         <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center">
//           Recent Orders
//         </h2>

//         <div className="overflow-x-auto bg-white rounded-lg shadow border border-gray-200">
//           <table className="w-full table-auto">
//             <thead className="bg-gray-100 sticky top-0 z-10">
//               <tr>
//                 <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 uppercase tracking-wide">
//                   Order ID
//                 </th>
//                 <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 uppercase tracking-wide">
//                   Customer
//                 </th>
//                 <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 uppercase tracking-wide">
//                   Status
//                 </th>
//                 <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 uppercase tracking-wide">
//                   Total
//                 </th>
//               </tr>
//             </thead>
//             <tbody>
//               {Array.from({ length: 8 }).map((_, idx) => (
//                 <tr key={idx} className="border-b hover:bg-gray-50">
//                   <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-800">#12345</td>
//                   <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-800">John Doe</td>
//                   <td className="px-4 py-4 whitespace-nowrap text-sm text-yellow-600 font-medium">Pending</td>
//                   <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-800">$150.00</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;


import { useState } from "react";

// Mock order data
const mockOrders = [
  { id: "#1001", customer: "John Doe", status: "Pending", total: "$150.00" },
  { id: "#1002", customer: "Jane Smith", status: "Completed", total: "$320.00" },
  { id: "#1003", customer: "Bob Johnson", status: "Cancelled", total: "$0.00" },
  { id: "#1004", customer: "Alice Walker", status: "Pending", total: "$90.00" },
  { id: "#1005", customer: "Chris Evans", status: "Completed", total: "$210.00" },
  { id: "#1006", customer: "Sarah Lee", status: "Pending", total: "$75.00" },
  { id: "#1007", customer: "Michael Clark", status: "Completed", total: "$130.00" },
  { id: "#1008", customer: "Emily Stone", status: "Pending", total: "$95.00" },
  { id: "#1009", customer: "Tom Hardy", status: "Cancelled", total: "$0.00" },
  { id: "#1010", customer: "Emma Watson", status: "Completed", total: "$200.00" },
];

const statusColors = {
  Pending: "bg-yellow-100 text-yellow-800",
  Completed: "bg-green-100 text-green-800",
  Cancelled: "bg-red-100 text-red-800",
};

function App() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredOrders = mockOrders.filter((order) => {
    const matchesSearch =
      order.customer.toLowerCase().includes(search.toLowerCase()) ||
      order.id.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || order.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      {/* Dashboard Cards */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <Card color="indigo" value="10" label="New Orders" />
        <Card color="orange" value="5" label="Pending Deliveries" />
        <Card color="green" value="3" label="New Users" />
      </div>

      {/* Add Customer Button */}
      <div className="mt-8 flex justify-center">
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg shadow">
          Add New Customer
        </button>
      </div>

      {/* Recent Orders */}
      <div className="mt-10 max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center">
          Recent Orders
        </h2>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row items-center gap-4 mb-4 justify-between">
          <input
            type="text"
            placeholder="Search by customer or order ID"
            className="px-4 py-2 w-full md:w-1/2 border border-gray-300 rounded-lg shadow-sm"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
          />

          <select
            className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm"
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="All">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>

        {/* Orders Table */}
        <div className="overflow-x-auto bg-white rounded-lg shadow border border-gray-200">
          <table className="w-full table-auto">
            <thead className="bg-gray-100 sticky top-0 z-10">
              <tr>
                <Th>Order ID</Th>
                <Th>Customer</Th>
                <Th>Status</Th>
                <Th>Total</Th>
              </tr>
            </thead>
            <tbody>
              {paginatedOrders.length > 0 ? (
                paginatedOrders.map((order, idx) => (
                  <tr key={idx} className="border-b hover:bg-gray-50">
                    <Td>{order.id}</Td>
                    <Td>{order.customer}</Td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${statusColors[order.status]}`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <Td>{order.total}</Td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center py-6 text-gray-500">
                    No orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center mt-6 gap-2">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 rounded ${
                currentPage === i + 1
                  ? "bg-indigo-600 text-white"
                  : "bg-white text-indigo-600 border border-indigo-600"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// 🧩 Reusable Components
const Card = ({ color, value, label }) => (
  <div
    className={`bg-${color}-100 p-6 rounded-xl shadow hover:shadow-lg transition duration-300`}
  >
    <div className={`text-3xl font-bold text-${color}-800`}>{value}</div>
    <div className={`mt-2 text-lg text-${color}-700`}>{label}</div>
  </div>
);

const Th = ({ children }) => (
  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 uppercase tracking-wide">
    {children}
  </th>
);

const Td = ({ children }) => (
  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-800">
    {children}
  </td>
);

export default App;

