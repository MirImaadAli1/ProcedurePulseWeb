import { useNavigate } from 'react-router-dom';

// Authentication layout components
import BasicLayout from 'layouts/authentication/components/BasicLayout';
import './landing-page-style.css';
import svgImage from './../../assets/images/bg-landing-page-layered-waves-haikei.svg'

function LandingPage() {
  const navigate = useNavigate();
  const handleGetStartedClick = () => {
    navigate('/sign-up');
  }
  return (
    <>
      {/* Inline styles */}
      <style>
        {`
          .svg-bottom {
            width: 100%; /* Ensure the SVG spans the entire width */
            height: auto; /* Auto-adjust height to maintain aspect ratio */
            object-fit: cover; /* Cover the space while preserving aspect ratio */
          }

          /* Media query for mobile devices */
          @media (max-width: 768px) {
            .svg-bottom {
              height: 20vh; /* Reduce height on smaller screens */
            }
          }

          /* Custom responsive typography for title */
          @media (max-width: 768px) {
            .title {
              font-size: 2rem; /* Smaller font size for mobile devices */
            }
            .subtitle {
              font-size: 1rem; /* Smaller font size for mobile devices */
            }
          }

        `}
      </style>

      <BasicLayout>
        {/* Wrapper div for positioning */}
        <div className="relative min-h-screen flex flex-col">
          {/* Main content */}
          <div className="flex items-center justify-center flex-grow z-10">
            <div className="p-12 text-center w-auto mx-auto">
              <div className="flex flex-col items-center text-center whitespace-nowrap">
                {/* Title */}
                <div className="mb-4 font-bold text-4xl text-dark ">
                  Create and Record Audits in a Few Simple Steps!
                </div>

                {/* Subtitle */}
                <div className="mb-6 text-lg text-dark">
                  ProcedurePulse is a user-owned process standardization tool and sharing <br />
                  website that allows you to create and distribute standard methods, <br />
                  with responses available and accessible to you.
                </div>

                {/* Sign Up Button */}
                <button className="bg-blue-600 text-white py-2 px-4 font-semibold rounded-md whitespace-nowrap mr-2 z-10" onClick={handleGetStartedClick}>
                  Get Started!
                </button>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
              </div>
            </div>
          </div>
        </div>
        {/* SVG Image at the bottom */}
        <img
          src={svgImage}
          alt="SVG Background"
          className="absolute bottom-0 left-0 w-screen h-auto z-0 pointer-events-none svg-bottom"
        />
      </BasicLayout>
    </>
  );
}

export default LandingPage;
