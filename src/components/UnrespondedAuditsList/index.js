import React from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import { FixedSizeList as List } from 'react-window';
import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';

const AuditsList = ({ respondedAudits, unrespondedAudits }) => {
    const Row = ({ index, style, data }) => {
        return (
            <li style={{ ...style, ...styles.listItem }}>
                {data[index]}
            </li>
        );
    };

    // Add prop-types validation for the Row component
    Row.propTypes = {
        index: PropTypes.number.isRequired, // Index is a required number
        style: PropTypes.object.isRequired, // Style is a required object (from react-window)
        data: PropTypes.arrayOf(PropTypes.string).isRequired // Data is an array of strings
    };

    return (
        <MDBox style={styles.listsContainer}>
            <MDBox style={styles.scrollableList}>
                <MDTypography variant="h6" style={styles.header}>Responded Audits</MDTypography>
                {respondedAudits.length > 0 ? (
                    <List
                        height={180}
                        itemCount={respondedAudits.length}
                        itemSize={35}
                        width={'100%'}
                        itemData={respondedAudits}
                    >
                        {Row}
                    </List>
                ) : (
                    <li style={styles.listItem}>No responded audits</li>
                )}
            </MDBox>
            <MDBox style={styles.scrollableList}>
                <MDTypography variant="h6" style={styles.header}>Unresponded Audits</MDTypography>
                {unrespondedAudits.length > 0 ? (
                    <List
                        height={180}
                        itemCount={unrespondedAudits.length}
                        itemSize={35}
                        width={'100%'}
                        itemData={unrespondedAudits}
                    >
                        {Row}
                    </List>
                ) : (
                    <li style={styles.listItem}>No unresponded audits</li>
                )}
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
        marginBottom: '20px',
        padding: '10px',
        backgroundColor: '#f9f9f9',
        borderRadius: '8px',
        border: '1px solid #ddd',
    },
    header: {
        marginBottom: '10px',
        fontWeight: 'bold',
        fontSize: '1.25rem',
        color: '#333',
    },
    listItem: {
        padding: '8px 10px',
        borderBottom: '1px solid #eee',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
    },
};

export default AuditsList;
