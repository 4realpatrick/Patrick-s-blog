import { cn } from "@/lib/utils";

const Logo: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={cn("h-10 w-6", className)}
      viewBox="0 0 60 36"
      fill="none"
    >
      <path
        d="M7.82356 18.2507C7.82356 18.2507 7.99936 18.2739 8.31645 18.3004C11.0949 18.5339 13.89 18.1383 16.4971 17.1425C19.1042 16.1467 21.4573 14.5759 23.3841 12.5451C30.2468 5.30793 35.7393 2.72997 41.6951 4.288C58.2431 8.61605 38.0707 26.2296 38.0707 26.2296L18.8676 29.7762L7.82356 18.2507Z"
        className="fill-primary"
      />
      <path
        d="M1.33546 19.5819C1.33546 19.5819 -2.23308 7.74348 2.2966 10.0234C10.84 14.32 23.3644 35.1705 33.7743 17.8053L26.6274 30.1056L13.7612 31.5461L4.63454 25.4498L1.33546 19.5819Z"
        className="fill-primary"
      />
      <path
        d="M51.1651 8.77335C50.3436 9.26013 49.2626 10.2055 48.4444 12.0103C47.802 13.4309 47.3239 15.3813 47.268 18.0586C47.2006 21.2724 46.0769 24.1715 44.2351 26.6551C39.9354 32.4601 31.7173 36 23.905 36C11.4184 36 1.42746 26.1567 0.11144 13.9276C1.38146 22.1963 8.24744 28.8572 16.8073 28.8572C19.9558 28.8584 23.0436 27.9845 25.7312 26.3318C28.4188 24.679 30.6021 22.3113 32.0409 19.4892C32.7424 18.1233 33.257 16.6679 33.5706 15.1628C33.5754 15.1415 33.5787 15.1199 33.5804 15.0982C33.6051 14.5551 38.948 7.50175 46.5714 7.56633C47.917 7.57792 49.3973 7.77495 51.0304 8.04152C51.1101 8.05475 51.1838 8.09241 51.2414 8.14936C51.2991 8.20631 51.3379 8.27979 51.3526 8.35979C51.3674 8.43978 51.3573 8.52241 51.3237 8.59641C51.2902 8.67042 51.2348 8.7322 51.1651 8.77335Z"
        className="fill-primary"
      />
      <path
        d="M52.606 8.59784C52.606 8.59784 59.3422 0.868932 59.5788 7.10769C59.8154 13.3464 52.606 8.59784 52.606 8.59784Z"
        className="fill-primary"
      />
      <path
        d="M51.543 7.36764C51.543 7.36764 46.44 -1.53847 52.376 0.233151C58.312 2.00477 51.543 7.36764 51.543 7.36764Z"
        className="fill-primary"
      />
    </svg>
  );
};

export default Logo;
