import { useNavigate } from 'react-router-dom';
import BasicLayout from 'layouts/authentication/components/BasicLayout';
import './landing-page-style.css';
import svgImage from './../../assets/images/bg-landing-page-layered-waves-haikei.svg';

function LandingPage() {
  const navigate = useNavigate();
  const handleGetStartedClick = () => {
    navigate('/authentication/sign-up');
  };

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

          /* Base styles for larger screens */
          .title {
            font-size: 3rem; /* Default font size */
            margin-bottom: 1rem; /* Default margin */
          }

          .subtitle {
            font-size: 1.5rem; /* Default font size */
            margin-bottom: 1.5rem; /* Default margin */
          }

          .button {
            font-size: 1rem; /* Default button font size */
            padding: 0.75rem 1.5rem; /* Default button padding */
          }

          /* Adjustments for screens 1100px or smaller */
          @media (max-width: 1100px) {
            .title {
              font-size: 2.5rem; /* Adjust font size */
              margin-bottom: 0.875rem; /* Adjust margin */
            }
            .subtitle {
              font-size: 1.25rem; /* Adjust font size */
              margin-bottom: 1.25rem; /* Adjust margin */
            }
            .button {
              font-size: 0.95rem; /* Adjust button font size */
              padding: 0.65rem 1.3rem; /* Adjust button padding */
            }
          }

          /* Further adjustments for smaller screens */
          @media (max-width: 768px) {
            .title {
              font-size: 2rem; /* Adjust font size for smaller screens */
              margin-bottom: 0.75rem; /* Adjust margin */
            }
            .subtitle {
              font-size: 1.2rem; /* Adjust font size for smaller screens */
              margin-bottom: 1rem; /* Adjust margin */
            }
            .button {
              font-size: 0.9rem; /* Adjust button font size */
              padding: 0.6rem 1.2rem; /* Adjust button padding */
            }
            .svg-bottom {
              height: 20vh; /* Adjust SVG height on smaller screens */
            }
          }

          /* Adjustments for very small screens (480px and below) */
          @media (max-width: 480px) {
            .title {
              font-size: 1.5rem; /* Further reduce font size */
              margin-bottom: 0.5rem; /* Further adjust margin */
            }
            .subtitle {
              font-size: 1rem; /* Further reduce font size */
              margin-bottom: 0.75rem; /* Further adjust margin */
            }
            .button {
              font-size: 0.8rem; /* Further adjust button font size */
              padding: 0.5rem 1rem; /* Further adjust button padding */
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
              <div className="flex flex-col items-center text-center lg:whitespace-nowrap whitespace-normal">
                {/* Title */}
                <div className="title font-bold text-dark">
                  Create and Record Audits in a Few Simple Steps!
                </div>

                {/* Subtitle */}
                <div className="subtitle text-dark">
                  ProcedurePulse is a user-owned process standardization tool and sharing <br />
                  website that allows you to create and distribute standard methods, <br />
                  with responses available and accessible to you.
                </div>

                {/* Sign Up Button */}
                <button
                  className="bg-blue-600 text-white py-2 px-4 font-semibold rounded-md button z-10"
                  onClick={handleGetStartedClick}
                >
                  Get Started!
                </button>
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
