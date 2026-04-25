import { Link } from "react-router-dom";

const SideBar = () => {
  return (
    <div
      style={{
        width: "220px",
        height: "100vh",
        background: "#1e293b",
        color: "white",
        padding: "20px",
        position: "fixed",
      }}
    >
      <nav style={{ marginTop: "30px" }}>
        <Link to="/admin/add-photo" style={styles.link}>
          Add Photo
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-10 h-10 text-blue-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 16.5V7a2 2 0 012-2h3l1.2-1.8A2 2 0 0111.2 2h1.6a2 2 0 011.6.8L15.6 5H19a2 2 0 012 2v9.5a2 2 0 01-2 2H5a2 2 0 01-2-2z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 14l4-4a1.5 1.5 0 012.1 0l3 3 1-1a1.5 1.5 0 012.1 0L21 7"
            />
          </svg>
        </Link>
        <br />
        <Link to="/admin/add-certificate" style={styles.link}>
          Add Certificate
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-10 h-10 text-blue-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 16.5V7a2 2 0 012-2h3l1.2-1.8A2 2 0 0111.2 2h1.6a2 2 0 011.6.8L15.6 5H19a2 2 0 012 2v9.5a2 2 0 01-2 2H5a2 2 0 01-2-2z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 14l4-4a1.5 1.5 0 012.1 0l3 3 1-1a1.5 1.5 0 012.1 0L21 7"
            />
          </svg>
        </Link>
        <br />
        <Link to="/admin/add-Blog" style={styles.link}>
          Add Blog
        </Link>

        <br />
        <Link to="/admin/Blogs" style={styles.link}>
          Blogs
        </Link>

        <br />
        <Link to="/admin/Gallery" style={styles.link}>
          Gallery
        </Link>

        <br />
        <Link to="/admin/change-password" style={styles.link}>
          Change Password
        </Link>
        <br />
      </nav>
    </div>
  );
};

const styles = {
  link: {
    display: "block",
    color: "white",
    margin: "12px 0",
    textDecoration: "none",
    fontSize: "18px",
  },
};

export default SideBar;
