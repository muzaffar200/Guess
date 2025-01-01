import { Link } from "react-router-dom";

function SoftEmbrace() {
    return (
        <Link to={'/product/18'}>
            <div className="relative w-full h-auto" style={{ paddingTop: "48.52%" }}>
                <div className="absolute top-0 left-0 w-full h-auto flex items-center justify-center">
                    <img
                        className="object-cover w-full "
                        src="https://img.guess.com/image/upload/q_auto,f_auto,dpr_auto,w_3636,c_limit/v1/NA/Asset/North%20America/E-Commerce/Guess/Bug%20Number/10171/G_Site_Home_ContentCenter_EOS_10171_10"
                        alt=""
                    />
                </div>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[70%] text-center">
                    <h2 className="SoftH2 text-[clamp(2rem, 5vw, 7.5rem)] FreightDis text-[#fff]">
                        <span className="luxurious-script-regular">S</span>
                        oft
                        <span className="luxurious-script-regular">E</span>
                        mbrace
                    </h2>
                    <span className="SoftSpan border-b-2 text-[clamp(2rem, 4vw, 5rem)] text-[#fff] inline-block">
                        Shop the Edit
                    </span>
                </div>
            </div>
        </Link>


    )
}

export default SoftEmbrace;
