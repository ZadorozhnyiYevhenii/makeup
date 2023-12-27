import React, { useEffect, useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import axios from 'axios';

const GET_ALL_BRANDS = gql`
  query getAllBrands {
    getAllBrands {
      name
      id
    }
  }
`;

interface Brand {
  name: string;
  id: number;
}

interface QueryData {
  getAllBrands: Brand[];
}

export const BrandList: React.FC = () => {
  const { loading, error, data } = useQuery<QueryData>(GET_ALL_BRANDS);

  if (loading) return <p>Loading...</p>;
  if (error) {
    console.error('Error fetching data:', error);
    return <p>Error: {error.message}</p>;
  }

  return (
    <div>
      <h1>Brand List</h1>
      <ul>
        {data?.getAllBrands.map((brand) => (
          <li key={brand.id}>{brand.name}</li>
        ))}
      </ul>
    </div>
  );
};

// export const BrandList: React.FC = () => {
//   const [responseData, setResponseData] = useState<any>(null);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get('http://13.49.76.232:8080/test');
//         setResponseData(response.data);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//         setError('An error occurred while fetching data.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error: {error}</p>;

//   return (
//     <div>
//       <h1>Response Data:</h1>
//       <pre>{JSON.stringify(responseData, null, 2)}</pre>
//     </div>
//   );
// };
