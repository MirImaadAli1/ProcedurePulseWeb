import React from 'react';
import PropTypes from 'prop-types'; // Import PropTypes for prop validation
import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';

const AuditsList = ({ respondedAudits, unrespondedAudits }) => {
    return (
        // Main container for both lists (responded and unresponded audits)
        <MDBox style={styles.listsContainer}>
            
            {/* Responded audits list */}
            <MDBox style={styles.scrollableList}>
                <MDTypography variant="h6" style={styles.header}>
                    Responded Audits
                </MDTypography>
                <ul style={styles.list}>
                    {respondedAudits.length > 0 ? (
                        // Map through the responded audits and display each audit title
                        respondedAudits.map((title, index) => (
                            <li key={index} style={styles.listItem}>{title}</li>
                        ))
                    ) : (
                        // If no responded audits, show the fallback message
                        <li style={styles.listItem}>No responded audits</li>
                    )}
                </ul>
            </MDBox>

            {/* Unresponded audits list */}
            <MDBox style={styles.scrollableList}>
                <MDTypography variant="h6" style={styles.header}>
                    Unresponded Audits
                </MDTypography>
                <ul style={styles.list}>
                    {unrespondedAudits.length > 0 ? (
                        // Map through the unresponded audits and display each audit title
                        unrespondedAudits.map((title, index) => (
                            <li key={index} style={styles.listItem}>{title}</li>
                        ))
                    ) : (
                        // If no unresponded audits, show the fallback message
                        <li style={styles.listItem}>No unresponded audits</li>
                    )}
                </ul>
            </MDBox>
        </MDBox>
    );
};

// Define prop types to ensure the component receives the expected props
AuditsList.propTypes = {
    respondedAudits: PropTypes.arrayOf(PropTypes.string).isRequired, // Expect an array of strings for responded audits
    unrespondedAudits: PropTypes.arrayOf(PropTypes.string).isRequired // Expect an array of strings for unresponded audits
};

// Styles for the component
const styles = {
    listsContainer: {
        // Flex container for aligning both lists vertically
        display: 'flex',
        flexDirection: 'column',
        marginLeft: '20px',
        maxWidth: '350px',
        padding: '10px',
        borderRadius: '8px', // Rounded corners
        backgroundColor: '#403e3e', // Background color of the container
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Subtle shadow for elevation effect
    },
    scrollableList: {
        // Each list is scrollable with a max height
        flex: 1,
        overflowY: 'auto',
        maxHeight: '180px',
        marginBottom: '20px', // Space between the two lists
        padding: '10px',
        backgroundColor: '#f9f9f9', // Light background for the lists
        borderRadius: '8px',
        border: '1px solid #ddd', // Border to separate list from the background
    },
    header: {
        // Styling for the list headers (Responded Audits, Unresponded Audits)
        marginBottom: '10px',
        fontWeight: 'bold', // Bold header
        fontSize: '1.25rem', // Font size for the header
        color: '#333' // Text color
    },
    list: {
        // Reset the default styling for the unordered list
        listStyleType: 'none',
        padding: 0,
        margin: 0,
    },
    listItem: {
        // Each list item styling
        padding: '8px 10px', // Padding inside each list item
        borderBottom: '1px solid #eee', // Bottom border to separate list items
        cursor: 'pointer', // Pointer cursor for interactivity
        transition: 'background-color 0.3s', // Smooth transition for background color on hover
    }
};

export default AuditsList;
