const StyledText = ({ children }: { children: React.ReactNode }) => {
    return (
      <span
        style={{
          listStyle: "none",
          padding: "10px 20px",
          margin: 0,
          borderRadius: "8px",
          color: "white",
          fontWeight: "bold",
          fontSize: "25px",
          textAlign: "center",
          fontFamily: '"Gloria Hallelujah", cursive',
        }}
      >
        {children}
      </span>
    );
  };
  
  export default StyledText;
  