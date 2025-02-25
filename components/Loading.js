// components/Loading.js
"use client";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-c_deep_black bg-opacity-90">
      <div className="flex flex-col items-center">
        <div>
          <img
            className="animate-padlockBounce"
            src="/sigap_head-padlock.png"
            alt="head-padlock"
          />
          <img src="/sigap_body-padlock.png" alt="body-padlock" />
        </div>
        <span className="mt-2 inline-block overflow-hidden whitespace-nowrap text-white animate-typing">
          Aguarde um instante...
        </span>
      </div>
    </div>
  );
}
