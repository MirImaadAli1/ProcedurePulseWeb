import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import DataTable from 'examples/Tables/DataTable';
import { db } from "../../Firebase";
import { collection, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import TextField from '@mui/material/TextField';
import Fuse from 'fuse.js';
import { Button } from '@mui/material';
import EmptyState from "components/States/empty";
import Loading from "components/States/loading";

function AuditSearch() {
  const [rows, setRows] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredRows, setFilteredRows] = useState([]);
  const [fuse, setFuse] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const userMap = {};
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const auth = getAuth();
        const currentUser = auth.currentUser;

        if (!currentUser) {
          console.error("User not authenticated.");
          return;
        }

        const currentUserId = currentUser.uid;

        // Fetch users collection to map userId to names
        const usersCollectionRef = collection(db, 'Users');
        const usersSnapshot = await getDocs(usersCollectionRef);

        // Create a user map of userId -> name
        usersSnapshot.docs.forEach(doc => {
          const userData = doc.data();
          userMap[userData.uid] = userData.name;
        });

        // Fetch audits collection
        const auditsCollectionRef = collection(db, 'Audit');
        const auditsSnapshot = await getDocs(auditsCollectionRef);

        // Process audit data, filter out user's own audits
        const dataArray = auditsSnapshot.docs
          .map(doc => {
            const auditData = doc.data();
            return {
              id: doc.id,
              title: auditData.title,
              creator: userMap[auditData.userId],
              userId: auditData.userId,
              createdAt: auditData.createdAt?.toDate() || new Date(),
            };
          })
          .filter(audit => audit.userId !== currentUserId);

        // Prepare table rows with processed data
        const tableRows = dataArray.map((item) => ({
          author: (
            <MDBox display="flex" alignItems="center" lineHeight={1}>
              <MDTypography display="block" variant="button" fontWeight="medium">
                {item.creator}
              </MDTypography>
            </MDBox>
          ),
          title: (
            <div className="w-72 break-words">
              <MDTypography variant="caption" color="text" fontWeight="medium">
                {item.title}
              </MDTypography>
            </div>
          ),
          createdAt: (
            <MDTypography variant="caption" color="text" fontWeight="medium">
              {item.createdAt.toLocaleString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' })}
            </MDTypography>
          ),
          action: (
            <Button
              variant="contained"
              style={{ color: 'white', backgroundColor: '#2563eb' }}
              size="small"
              onClick={() => handleRespondClick(item.id)}
            >
              Respond
            </Button>
          ),
          rawItem: item,
        }));

        setRows(tableRows);

        const fuseInstance = new Fuse(dataArray, {
          keys: ['title'],
          threshold: 0.3,
        });
        setFuse(fuseInstance);
      } catch (error) {
        console.error("Error fetching Firestore data:", error);
      }
      setIsLoading(false);
    };

    fetchData();
  }, []);

  // Handle search input
  const handleSearch = (e) => {
    const searchValue = e.target.value;
    setSearchTerm(searchValue);

    if (!searchValue) {
      setFilteredRows([]);
    } else if (fuse) {
      const fuzzyResults = fuse.search(searchValue);
      const filtered = fuzzyResults.map(result => {
        const matchedItem = result.item;
        return rows.find(row => row.rawItem.id === matchedItem.id);
      }).filter(Boolean);

      setFilteredRows(filtered);
    }
  };

  const handleRespondClick = (auditId) => {
    navigate(`/respond-audit/${auditId}`);
  }

  const columns = [
    { Header: 'creator', accessor: 'author', width: '30%', align: 'left' },
    { Header: 'title', accessor: 'title', align: 'left' },
    { Header: 'created on', accessor: 'createdAt', align: 'center' },
    { Header: 'action', accessor: 'action', align: 'center' },
  ];

  return (
    <DashboardLayout>
      <DashboardNavbar />
      {/* Show the Loading component when data is loading */}
      {isLoading ? (
        <Loading />
      ) : (
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
                  {searchTerm === "" && !isLoading && (
                    <div className="flex justify-center mb-3">
                      <MDTypography variant="h6" color="text">
                        Try searching for an audit!
                      </MDTypography>
                    </div>
                  )}
                  {searchTerm !== "" && filteredRows.length === 0 && !isLoading && (
                    <EmptyState />
                  )}
                  {filteredRows.length > 0 && (
                    <DataTable
                      table={{ columns, rows: filteredRows }}
                      isSorted={false}
                      entriesPerPage={false}
                      showTotalEntries={false}
                      noEndBorder
                    />
                  )}
                </MDBox>
              </Card>
            </Grid>
          </Grid>
        </MDBox>
      )
      }
    </DashboardLayout>
  );
}

export default AuditSearch;
