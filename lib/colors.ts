export const getBadgeColor = (status: string) => {
    switch (status) {
      case "Completed":
      case "Paid":
        return "bg-green-100 text-green-700";
      case "In progress":
        return "bg-blue-100 text-blue-700";
      case "Unpaid":
      case "To do":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };