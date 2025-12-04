import type { UserTableData, UsersResponse } from "@/modules/users/types/users";

export const mockUsers: UserTableData[] = [
  {
    id: 1,
    firstName: "Emily",
    lastName: "Johnson",
    age: 28,
    email: "emily.johnson@x.dummyjson.com",
    phone: "+81 965-431-3024",
    username: "emilys",
    image: "https://dummyjson.com/icon/emilys/128",
    address: {
      city: "Phoenix",
      country: "United States",
    },
    company: {
      department: "Engineering",
      name: "Dooley and Sons",
      title: "Sales Manager",
    },
    role: "admin",
  },
  {
    id: 2,
    firstName: "Michael",
    lastName: "Williams",
    age: 35,
    email: "michael.williams@x.dummyjson.com",
    phone: "+49 258-627-6644",
    username: "michaelw",
    image: "https://dummyjson.com/icon/michaelw/128",
    address: {
      city: "Houston",
      country: "United States",
    },
    company: {
      department: "Support",
      name: "Spinka - Dickinson",
      title: "Support Specialist",
    },
    role: "admin",
  },
];

export const mockUsersResponse: UsersResponse = {
  users: mockUsers,
  total: 2,
  skip: 0,
  limit: 10,
};
