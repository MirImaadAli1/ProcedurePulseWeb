import React from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';

const AuditsList = ({ respondedAudits, unrespondedAudits }) => {
    return (
        <MDBox style={styles.listsContainer}>
            <MDBox style={styles.scrollableList}>
                <MDTypography variant="h6" style={styles.header}>Responded Audits</MDTypography>
                <ul style={styles.list}>
                    {respondedAudits.length > 0 ? (
                        respondedAudits.map((title, index) => <li key={index} style={styles.listItem}>{title}</li>)
                    ) : (
                        <li style={styles.listItem}>No responded audits</li>
                    )}
                </ul>
            </MDBox>
            <MDBox style={styles.scrollableList}>
                <MDTypography variant="h6" style={styles.header}>Unresponded Audits</MDTypography>
                <ul style={styles.list}>
                    {unrespondedAudits.length > 0 ? (
                        unrespondedAudits.map((title, index) => <li key={index} style={styles.listItem}>{title}</li>)
                    ) : (
                        <li style={styles.listItem}>No unresponded audits</li>
                    )}
                </ul>
            </MDBox>
        </MDBox>
    );
};

// Add prop types validation
AuditsList.propTypes = {
    respondedAudits: PropTypes.arrayOf(PropTypes.string).isRequired,
    unrespondedAudits: PropTypes.arrayOf(PropTypes.string).isRequired
};

const styles = {
    listsContainer: {
        display: 'flex',
        flexDirection: 'column',
        marginLeft: '20px',
        maxWidth: '490px',
        padding: '10px',
    borderRadius: '8px',
        backgroundColor: '#403e3e',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    scrollableList: {
        flex: 1,
        overflowY: 'auto',
        maxHeight: '180px',
        marginBottom: '20px',
        padding: '10px',
        backgroundColor: '#f9f9f9',
        borderRadius: '8px',
        border: '1px solid #ddd',
    },
    header: {
        marginBottom: '10px',
        fontWeight: 'bold',
        fontSize: '1.25rem', // Adjust this based on the actual font size in the Dashboard
        color: '#333' // Match the color to the Dashboard header color
    },
    list: {
        listStyleType: 'none',
        padding: 0,
        margin: 0,
    },
    listItem: {
        padding: '8px 10px',
        borderBottom: '1px solid #eee',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
    }
};

export default AuditsList;
