// import React, { useState } from "react";
// import axios from "axios";
// import { useHistory } from "react-router-dom";

// function UpdateDonation({ match }) {
//   const [product, setProduct] = useState("");
//   const [description, setDescription] = useState("");
//   const [category, setCategory] = useState("");
//   const [error, setError] = useState("");
//   const history = useHistory();

//   // Define donationId within the component
//   const donationId = match.params.id;

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const updatedDonation = { product, description, category };
//       const token = localStorage.getItem('token'); // Retrieve the token from localStorage

//       const response = await axios.put(
//         `http://localhost:5321/api/donations/${donationId}`, // Use the updated URL with /api prefix
//         updatedDonation,
//         {
//           headers: {
//             Authorization: `Bearer ${token}` // Include the token in the Authorization header
//           }
//         }
//       );

//       console.log(response.data);
//       history.push("/product"); // Redirect to the product display page after successful update
//     } catch (err) {
//       console.error("Error updating donation:", err);
//       setError("Failed to update donation. Please try again later.");
//     }
//   };

//   return (
//     <div className="container">
//       <div className="header">
//         <div className="text"> Update Product </div>
//         <div className="underline"></div>
//         <form onSubmit={handleSubmit}>
//           <div className="inputs">
            
//             {error && <p className="error-message">{error}</p>}
//             <div className="input">
//               <label htmlFor="">Product:</label>
//               <input
//                 type="text"
//                 placeholder="Enter Product"
//                 className="form-control"
//                 value={product}
//                 onChange={(e) => setProduct(e.target.value)}
//               />
//             </div>
//             <div className="input">
//               <label htmlFor="">Description:</label>
//               <input
//                 type="text"
//                 placeholder="Enter Description"
//                 className="form-control"
//                 value={description}
//                 onChange={(e) => setDescription(e.target.value)}
//               />
//             </div>
//             <div className="input">
//                   <label htmlFor="">Category:</label>
//                   <select
//                     value={category}
//                     onChange={(e) => setCategory(e.target.value)}
//                     className="form-control"
//                   >
//                     <option value="">Select Category</option>
//                     <option value="Baby Clothing">Baby Clothing</option>
//                     <option value="Feeding and Nursing">Feeding and Nursing</option>
//                     <option value="Nappies and Changing">Nappies and Changing</option>
//                     <option value="Baby Equipment">Baby Equipment</option>
//                     <option value="Nursery Furniture and Decor">Nursery Furniture and Decor</option>
//                     <option value="Health and Safety">Health and Safety</option>
//                     <option value="Toys">Toys</option>
//                     <option value="Bathing and Skincare">Bathing and Skincare</option>
//                   </select>
//                 </div>
//             <div className="submit-container">
//               <button type="submit" className="btn btn-primary">
//                 Update
//               </button>
//             </div>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default UpdateDonation;
