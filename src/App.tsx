import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";

// Example usage:
// connectWebSocketExtension('ws://192.168.208.213:8888');
// sendMessageToWebSocketExtension('Hello WebSocket');

function App() {
  const [products, setProducts] = useState<
    {
      id: string;
      amount: number;
      barcode: string;
      catalogcode: string;
      name: string;
      packagecode: string;
      vatRate: number;
    }[]
  >([]);
  useEffect(() => {
    axios
      .get("https://munis-savdo-crm.uz/products?limit=10&page=1", {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MmIxMGE1Yy1mYjBkLTQzMDAtYTI3Mi1jNmJjM2Y5ZmFiM2MiLCJ1c2VybmFtZSI6InRlc3QiLCJyb2xlIjoic3VwZXJhZG1pbiIsImlhdCI6MTcyMzY0MTA1MCwiZXhwIjoxNzIzNjYyNjUwfQ.1AAYIVgI59Q1Fvq_gbqtC1qJ8sGlel_jhK0-tHiMXaI",
        },
      })
      .then(({ data }) => {
        setProducts(data.data);
      });
  }, []);
  return (
    <>
      {products.length > 0 &&
        products.map((product) => (
          <div key={product.id} style={{ borderRadius: "4px" }}>
            <h2>{product.name}</h2>
            <button
              onClick={() => {
                window.postMessage(
                  {
                    type: "FROM_PAGE",
                    command: "sale",
                    data: {
                      products: [
                        {
                          id: product.id,
                          name: product.name,
                          barcode: product.barcode,
                          units: "шт",
                          price: 20000000,
                          vat: product.vatRate,
                          amount: 1,
                          isDecimalUnits: false,
                          labels: [],
                          psid: product.catalogcode,
                          packageCode: product.packagecode,
                          unitCode: null,
                          discountAmount: 0,
                          commissionTIN: null,
                          commissionPINFL: null,
                        },
                      ],
                      payments: [{ amount: 2000000, paymentType: "Cash" }],
                      amount: 2000000,
                      discountAmount: 0,
                      totalAmount: 2000000,
                      saleType: "Credit",
                    },
                  },
                  "*"
                );
              }}
            >
              Print
            </button>
          </div>
        ))}
    </>
  );
}

export default App;
