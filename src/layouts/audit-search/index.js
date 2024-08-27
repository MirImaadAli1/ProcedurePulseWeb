import React, { useEffect, useState } from "react";
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import DataTable from 'examples/Tables/DataTable';
import { db } from "../../Firebase";
import { collection, getDocs } from "firebase/firestore";
import TextField from '@mui/material/TextField';
import Fuse from 'fuse.js';  // Correct Fuse.js import

function AuditSearch() {
  const [rows, setRows] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredRows, setFilteredRows] = useState([]);
  const [fuse, setFuse] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const formsCollectionRef = collection(db, 'Audit');
        const querySnapshot = await getDocs(formsCollectionRef);

        const dataArray = querySnapshot.docs.map(doc => ({
          id: doc.id,
          title: doc.data().title,
          creator: doc.data().userId,
          createdAt: doc.data().createdAt?.toDate() || new Date(),
        }));

        const tableRows = dataArray.map((item) => ({
          author: (
            <MDBox display="flex" alignItems="center" lineHeight={1}>
              <MDTypography display="block" variant="button" fontWeight="medium">
                {item.creator}
              </MDTypography>
            </MDBox>
          ),
          title: (
            <MDTypography variant="caption" color="text" fontWeight="medium">
              {item.title}
            </MDTypography>
          ),
          createdAt: (
            <MDTypography variant="caption" color="text" fontWeight="medium">
              {item.createdAt.toLocaleString()}
            </MDTypography>
          ),
          action: (
            <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
              Edit
            </MDTypography>
          ),
          rawItem: item // Store raw item for matching with Fuse.js results
        }));

        setRows(tableRows);

        // Initialize Fuse.js for fuzzy search
        const fuseInstance = new Fuse(dataArray, {
          keys: ['title'],  // Search by title
          threshold: 0.3,   // Sensitivity
        });
        setFuse(fuseInstance);
      } catch (error) {
        console.error("Error fetching Firestore data:", error);
      }
    };

    fetchData();
  }, []);

  // Handle search input
  const handleSearch = (e) => {
    const searchValue = e.target.value;
    setSearchTerm(searchValue);

    if (searchValue && fuse) {
      const fuzzyResults = fuse.search(searchValue);

      // Map fuzzy search results to corresponding rows
      const filtered = fuzzyResults.map(result => {
        const matchedItem = result.item;
        return rows.find(row => row.rawItem.id === matchedItem.id);  // Match by ID
      }).filter(Boolean);  // Remove undefined values

      setFilteredRows(filtered);
    } else {
      setFilteredRows([]);  // Clear filtered rows when search is empty
    }
  };

  const columns = [
    { Header: 'creator', accessor: 'author', width: '30%', align: 'left' },
    { Header: 'title', accessor: 'title', align: 'left' },
    { Header: 'created on', accessor: 'createdAt', align: 'center' },
    { Header: 'action', accessor: 'action', align: 'center' },
  ];

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
                  Search Audits
                </MDTypography>
              </MDBox>

              <MDBox pt={3} px={2}>
                <TextField
                  fullWidth
                  variant="outlined"
                  label="Search by audit title"
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </MDBox>

              <MDBox pt={3}>
                <DataTable
                  table={{ columns, rows: filteredRows.length > 0 ? filteredRows : rows }} // Show filtered rows if search term exists
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default AuditSearch;
