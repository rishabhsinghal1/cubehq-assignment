import React, {
  createContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

interface CustomerContextType {
  selectedCustomer: number;
  setSelectedCustomer: Dispatch<SetStateAction<number>>;
}

const CustomerContext = createContext<CustomerContextType | undefined>(
  undefined
);

interface CustomerContextProviderProps {
  children: ReactNode;
}

const CustomerContextProvider: React.FC<CustomerContextProviderProps> = ({
  children,
}) => {
  const [selectedCustomer, setSelectedCustomer] = useState<number>(0);

  return (
    <CustomerContext.Provider value={{ selectedCustomer, setSelectedCustomer }}>
      {children}
    </CustomerContext.Provider>
  );
};

export { CustomerContextProvider, CustomerContext };
