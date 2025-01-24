import React from "react";

const About = () => {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginLeft: "250px", // Adjust this based on the width of your navbar
                fontFamily: "Arial, sans-serif",
            }}
        >
            <h1 style={{ textAlign: "center", marginBottom: "30px", marginTop: "40px" }}>
                Our Team
            </h1>

            {/* First Row: One centered card */}
            <div
                style={{
                    display: "flex",
                    justifyContent: "center", // Center the card
                    marginBottom: "30px", // Space between rows
                    width: "100%", // Ensures the div takes full width for centering
                }}
            >
                <div
                    style={{
                        width: "300px",
                        height: "300px", // Set card height
                        borderRadius: "10px",
                        overflow: "hidden",
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                        transition: "transform 0.3s, box-shadow 0.3s, z-index 0.3s",
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "scale(1.05)";
                        e.currentTarget.style.boxShadow =
                            "0 8px 16px rgba(0, 0, 0, 0.3)";
                        e.currentTarget.style.zIndex = "10"; // Bring the hovered card to the front
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "scale(1)";
                        e.currentTarget.style.boxShadow =
                            "0 4px 8px rgba(0, 0, 0, 0.2)";
                        e.currentTarget.style.zIndex = "1"; // Reset z-index after hover
                    }}
                >
                    <img
                        src="https://img.freepik.com/free-photo/business-finance-employment-female-successful-entrepreneurs-concept-friendly-smiling-office-manager-greeting-new-coworker-businesswoman-welcome-clients-with-hand-wave-hold-laptop_1258-59122.jpg"
                        alt="Employee 1"
                        style={{ width: "100%", height: "150px", objectFit: "cover" }}
                    />
                    <div style={{ padding: "10px" }}>
                        <h3 style={{ margin: "0" }}>Employee 1</h3>
                        <p style={{ fontSize: "14px", color: "#555" }}>
                            Role: Frontend Developer
                        </p>
                    </div>
                </div>
            </div>

            {/* Second Row: Three cards */}
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                    gap: "30px", // Space between cards
                    width: "100%", // Make the width a bit smaller to fit three cards
                    marginLeft: "60px", // Adjust this based on the width of the first card
                    marginTop: "20px", // Space between rows
                    marginBottom: "30px", // Space between rows
                }}
            >
                {/* Card 2 */}
                <div
                    style={{
                        width: "300px", // Card width
                        height: "300px",
                        borderRadius: "10px",
                        overflow: "hidden",
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                        transition: "transform 0.3s, box-shadow 0.3s, z-index 0.3s",
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "scale(1.05)";
                        e.currentTarget.style.boxShadow =
                            "0 8px 16px rgba(0, 0, 0, 0.3)";
                        e.currentTarget.style.zIndex = "10"; // Bring the hovered card to the front
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "scale(1)";
                        e.currentTarget.style.boxShadow =
                            "0 4px 8px rgba(0, 0, 0, 0.2)";
                        e.currentTarget.style.zIndex = "1"; // Reset z-index after hover
                    }}
                >
                    <img
                        src="https://img.freepik.com/free-photo/business-finance-employment-female-successful-entrepreneurs-concept-friendly-smiling-office-manager-greeting-new-coworker-businesswoman-welcome-clients-with-hand-wave-hold-laptop_1258-59122.jpg"
                        alt="Employee 2"
                        style={{ width: "100%", height: "150px", objectFit: "cover" }}
                    />
                    <div style={{ padding: "10px" }}>
                        <h3 style={{ margin: "0" }}>Employee 2</h3>
                        <p style={{ fontSize: "14px", color: "#555" }}>
                            Role: Backend Developer
                        </p>
                    </div>
                </div>

                {/* Card 3 */}
                <div
                    style={{
                        width: "300px", // Card width
                        height: "300px",
                        borderRadius: "10px",
                        overflow: "hidden",
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                        transition: "transform 0.3s, box-shadow 0.3s, z-index 0.3s",
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "scale(1.05)";
                        e.currentTarget.style.boxShadow =
                            "0 8px 16px rgba(0, 0, 0, 0.3)";
                        e.currentTarget.style.zIndex = "10"; // Bring the hovered card to the front
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "scale(1)";
                        e.currentTarget.style.boxShadow =
                            "0 4px 8px rgba(0, 0, 0, 0.2)";
                        e.currentTarget.style.zIndex = "1"; // Reset z-index after hover
                    }}
                >
                    <img
                        src="https://img.freepik.com/free-photo/business-finance-employment-female-successful-entrepreneurs-concept-friendly-smiling-office-manager-greeting-new-coworker-businesswoman-welcome-clients-with-hand-wave-hold-laptop_1258-59122.jpg"
                        alt="Employee 3"
                        style={{ width: "100%", height: "150px", objectFit: "cover" }}
                    />
                    <div style={{ padding: "10px" }}>
                        <h3 style={{ margin: "0" }}>Employee 3</h3>
                        <p style={{ fontSize: "14px", color: "#555" }}>
                            Role: UI/UX Designer
                        </p>
                    </div>
                </div>

                {/* Card 4 */}
                <div
                    style={{
                        width: "300px", // Card width
                        height: "300px",
                        borderRadius: "10px",
                        overflow: "hidden",
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                        transition: "transform 0.3s, box-shadow 0.3s, z-index 0.3s",
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "scale(1.05)";
                        e.currentTarget.style.boxShadow =
                            "0 8px 16px rgba(0, 0, 0, 0.3)";
                        e.currentTarget.style.zIndex = "10"; // Bring the hovered card to the front
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "scale(1)";
                        e.currentTarget.style.boxShadow =
                            "0 4px 8px rgba(0, 0, 0, 0.2)";
                        e.currentTarget.style.zIndex = "1"; // Reset z-index after hover
                    }}
                >
                    <img
                        src="https://img.freepik.com/free-photo/business-finance-employment-female-successful-entrepreneurs-concept-friendly-smiling-office-manager-greeting-new-coworker-businesswoman-welcome-clients-with-hand-wave-hold-laptop_1258-59122.jpg"
                        alt="Employee 4"
                        style={{ width: "100%", height: "150px", objectFit: "cover" }}
                    />
                    <div style={{ padding: "10px" }}>
                        <h3 style={{ margin: "0" }}>Employee 4</h3>
                        <p style={{ fontSize: "14px", color: "#555" }}>
                            Role: Project Manager
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;


