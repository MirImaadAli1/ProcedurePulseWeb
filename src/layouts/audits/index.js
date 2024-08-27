import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';
import Card from '@mui/material/Card';
import Footer from 'examples/Footer';
import AuditsTable from './components/Cards';
import { collection, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';
import { auth, db } from '../../Firebase';
import EditFormModal from './components/EditFormModel';

function Audits() {
  const [forms, setForms] = useState([]);
  const [selectedForm, setSelectedForm] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);

    useEffect(() => {
      const fetchForms = async () => {
        const user = auth.currentUser;
        if (user) {
          const formsCollectionRef = collection(db, 'Audit');
          const q = query(formsCollectionRef, where('userId', '==', user.uid));
          const querySnapshot = await getDocs(q);
          const userForms = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }));
          // Log the fetched forms
          console.log("Fetched audits:", userForms);
          // Log the fetched forms
          console.log("userid:", user.uid);
          setForms(userForms);
        }
      };
      fetchForms();
    }, []);

  const handleEdit = (form) => {
    setSelectedForm(form);
    setEditModalOpen(true);
  };

  const handleSave = async (updatedForm) => {
    const formDocRef = doc(db, 'Audit', updatedForm.id);
    await updateDoc(formDocRef, updatedForm);
    setForms(forms.map((form) => (form.id === updatedForm.id ? updatedForm : form)));
    setEditModalOpen(false);
  };

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
                <AuditsTable forms={forms} handleEdit={handleEdit} />
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