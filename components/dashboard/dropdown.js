import Link from "next/link";

const DropDown = ({ isShow, buttonList }) => {
  return (
    isShow && (
      <div
        style={{
          backgroundColor: "white",
          borderRadius: "10px",
          position: "relative",
          textAlign: "center",
          border: "1px solid #C4181A",
          zIndex: 999,
        }}
      >
        <ul
          style={{
            padding: 0,
            margin: 0,
            textAlign: "center",
            fontSize: "1rem",
          }}
        >
          {buttonList.map((button, index) => {
            return (
              <li
                key={index}
                style={{
                  padding: ".5rem 1rem",
                  margin: "10px 0",
                }}
                className="sub-nav-li"
              >
                <Link href={button.path} className="nav-button">
                  {button.text}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    )
  );
};

export default DropDown;
