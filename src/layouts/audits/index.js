// import React, { useEffect, useState } from 'react';
// import Grid from '@mui/material/Grid';
// import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
// import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
// import MDBox from 'components/MDBox';
// import MDTypography from 'components/MDTypography';
// import Card from '@mui/material/Card';
// import AuditsTable from './components/Cards';
// import { collection, query, where, getDocs, updateDoc, doc, deleteDoc } from 'firebase/firestore';
// import { auth, db } from '../../Firebase';
// import EditFormModal from './components/EditFormModel';

// function Audits() {
//   const [forms, setForms] = useState([]);
//   const [selectedForm, setSelectedForm] = useState(null);
//   const [editModalOpen, setEditModalOpen] = useState(false);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchForms = async () => {
//       try {
//         const user = auth.currentUser;
//         if (user) {
//           const formsCollectionRef = collection(db, 'Audit');
//           const q = query(formsCollectionRef, where('userId', '==', user.uid));
//           const querySnapshot = await getDocs(q);
//           const userForms = querySnapshot.docs.map(doc => ({
//             id: doc.id,
//             ...doc.data(),
//           }));
//           setForms(userForms);
//         }
//       } catch (error) {
//         console.error('Error fetching forms:', error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchForms();
//   }, []);

//   const handleEdit = (form) => {
//     setSelectedForm(form);
//     setEditModalOpen(true);
//   };

//   const handleSave = async (updatedForm) => {
//     try {
//       const formWithValues = {
//         ...updatedForm,
//         questions: updatedForm.questions.map(q => ({
//           value: q.value,
//         })),
//       };

//       const formDocRef = doc(db, 'Audit', formWithValues.id);
//       await updateDoc(formDocRef, formWithValues);
//       setForms(forms.map((form) => (form.id === formWithValues.id ? formWithValues : form)));
//       setEditModalOpen(false);
//     } catch (error) {
//       console.error('Error saving form:', error);
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       await deleteDoc(doc(db, 'Audit', id));
//       setForms(forms.filter(form => form.id !== id));
//     } catch (error) {
//       console.error('Error deleting form:', error);
//     }
//   };

//   if (loading) {
//     return <MDTypography variant="h6">Loading...</MDTypography>;
//   }

//   return (
//     <DashboardLayout>
//       <DashboardNavbar />
//       <MDBox pt={6} pb={3}>
//         <Grid container spacing={6}>
//           <Grid item xs={12}>
//             <Card>
//               <MDBox
//                 mx={2}
//                 mt={-3}
//                 py={3}
//                 px={2}
//                 variant="gradient"
//                 bgColor="info"
//                 borderRadius="lg"
//                 coloredShadow="info"
//               >
//                 <MDTypography variant="h6" color="white">
//                   Audits Table
//                 </MDTypography>
//               </MDBox>
//               <MDBox pt={3}>
//                 <AuditsTable forms={forms} handleEdit={handleEdit} handleDelete={handleDelete} />
//               </MDBox>
//             </Card>
//           </Grid>
//         </Grid>
//       </MDBox>
//       {selectedForm && (
//         <EditFormModal
//           open={editModalOpen}
//           onClose={() => setEditModalOpen(false)}
//           formData={selectedForm}
//           onSave={handleSave}
//         />
//       )}
//     </DashboardLayout>
//   );
// }

// export default Audits;
// src/layouts/audits/Audits.js
import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';
import Card from '@mui/material/Card';
import AuditsTable from './components/Cards';
import { collection, query, where, getDocs, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { auth, db } from '../../Firebase';
import EditFormModal from './components/EditFormModel';

function Audits() {
  const [forms, setForms] = useState([]);
  const [selectedForm, setSelectedForm] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchForms = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const formsCollectionRef = collection(db, 'Audit');
          const q = query(formsCollectionRef, where('userId', '==', user.uid));
          const querySnapshot = await getDocs(q);
          const userForms = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }));
          setForms(userForms);
        }
      } catch (error) {
        console.error('Error fetching forms:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchForms();
  }, []);

  const handleEdit = (form) => {
    setSelectedForm(form);
    setEditModalOpen(true);
  };

  const handleSave = async (updatedForm) => {
    try {
      const formWithValues = {
        ...updatedForm,
        questions: updatedForm.questions.map(q => ({
          value: q.value,
        })),
      };

      const formDocRef = doc(db, 'Audit', formWithValues.id);
      await updateDoc(formDocRef, formWithValues);
      setForms(forms.map((form) => (form.id === formWithValues.id ? formWithValues : form)));
      setEditModalOpen(false);
    } catch (error) {
      console.error('Error saving form:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'Audit', id));
      setForms(forms.filter(form => form.id !== id));
    } catch (error) {
      console.error('Error deleting form:', error);
    }
  };

  if (loading) {
    return <MDTypography variant="h6">Loading...</MDTypography>;
  }

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Audits Table
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <AuditsTable forms={forms} handleEdit={handleEdit} handleDelete={handleDelete} />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      {selectedForm && (
        <EditFormModal
          open={editModalOpen}
          onClose={() => setEditModalOpen(false)}
          formData={selectedForm}
          onSave={handleSave}
        />
      )}
    </DashboardLayout>
  );
}

export default Audits;
