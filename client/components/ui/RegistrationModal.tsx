import React, { useState } from "react";
import { X, Loader2, CreditCard } from "lucide-react";
import { useForm } from "react-hook-form";
import api from "@/services/api";

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  eventId: number;
  eventTitle: string;
  pricePerTicket: number;
  onSuccess: (ticketNo?: string, email?: string) => void;
}


interface RegisterFormValues {
  name: string;
  email: string;
  phone: string;
  address: string;
  tickets: number;
}

export default function RegistrationModal({
  isOpen,
  onClose,
  eventId,
  eventTitle,
  pricePerTicket,
  onSuccess,
}: RegistrationModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    defaultValues: {
      tickets: 1,
    },
  });

  const ticketCount = watch("tickets") || 1;
  const totalAmount = pricePerTicket * ticketCount;

  if (!isOpen) return null;

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const onSubmit = async (data: RegisterFormValues) => {
    setIsSubmitting(true);
    setErrorMsg("");

    try {
      // 1. Create order on backend
      const orderRes = await api.post("/payment/create-order", {
        eventId,
        name: data.name,
        email: data.email,
        phone: data.phone,
        address: data.address,
        tickets: Number(data.tickets),
      });

      if (!orderRes.data.success) {
        throw new Error(orderRes.data.message || "Failed to create order");
      }

      const { orderId, amount, isFree, isMock } = orderRes.data;

      // 2. If free event, payment bypasses Razorpay checkout
      if (isFree) {
        const verifyRes = await api.post("/payment/verify", {
          orderId,
          paymentId: "free_event_bypass",
        });

        if (verifyRes.data.success) {
          onSuccess(verifyRes.data.ticket, data.email);
          onClose();
        } else {
          throw new Error("Free registration verification failed.");
        }
        return;
      }

      // 3. Load Razorpay script
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded && !isMock) {
        throw new Error("Razorpay SDK failed to load. Please check your internet connection.");
      }

      // 4. Handle Mock Checkout for development if Razorpay is not configured on backend
      if (isMock) {
        console.warn("Dev mode mock checkout selected due to missing Razorpay credentials.");
        // Simulate a checkout delay
        setTimeout(async () => {
          try {
            const verifyRes = await api.post("/payment/verify", {
              orderId,
              paymentId: `pay_mock_${Date.now()}`,
            });

            if (verifyRes.data.success) {
              onSuccess(verifyRes.data.ticket, data.email);
              onClose();
            } else {
              throw new Error("Mock payment verification failed.");
            }
          } catch (e: any) {
            setErrorMsg(e.message || "Mock verification error.");
          } finally {
            setIsSubmitting(false);
          }
        }, 1500);
        return;
      }

      // 5. Open Real Razorpay Checkout
      const keyId = import.meta.env.VITE_RAZORPAY_KEY_ID || "rzp_test_xxxxxxxxxxxx";
      const options = {
        key: keyId,
        amount: amount,
        currency: "INR",
        name: "Baehive Club",
        description: `Booking for ${eventTitle}`,
        image: "https://pub-7f2dabc5b5c14daab8ff8b19e15a314e.r2.dev/Beahive%20Official%20Logo%20Color%20PNG.png",
        order_id: orderId,
        handler: async function (response: any) {
          setIsSubmitting(true);
          try {
            const verifyRes = await api.post("/payment/verify", {
              orderId: response.razorpay_order_id,
              paymentId: response.razorpay_payment_id,
              signature: response.razorpay_signature,
            });

            if (verifyRes.data.success) {
              onSuccess(verifyRes.data.ticket, data.email);
              onClose();
            } else {
              setErrorMsg("Payment signature verification failed.");
            }
          } catch (err: any) {
            setErrorMsg(err.response?.data?.message || "Failed to verify transaction signature.");
          } finally {
            setIsSubmitting(false);
          }
        },

        prefill: {
          name: data.name,
          email: data.email,
          contact: data.phone,
        },
        theme: {
          color: "#D14E9A",
        },
        modal: {
          ondismiss: function () {
            setIsSubmitting(false);
          },
        },
      };

      const razorpayObj = new (window as any).Razorpay(options);
      razorpayObj.open();
    } catch (err: any) {
      console.error("Booking error:", err);
      setErrorMsg(err.response?.data?.message || err.message || "An unhandled booking error occurred.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />

      <div className="relative bg-white rounded-3xl w-full max-w-lg shadow-2xl p-6 overflow-hidden z-10 border border-pink-100">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-gray-100">
          <div>
            <h3 className="text-xl font-bold font-serif text-gray-800">Register Event</h3>
            <p className="text-xs text-gray-400 mt-0.5 line-clamp-1">{eventTitle}</p>
          </div>
          <button onClick={onClose} className="p-1 text-gray-400 hover:text-gray-600 rounded-full">
            <X size={20} />
          </button>
        </div>

        {errorMsg && (
          <div className="mt-4 p-3 bg-red-50 text-red-600 text-xs rounded-xl border border-red-100">
            {errorMsg}
          </div>
        )}

        {/* Form Body */}
        <form onSubmit={handleSubmit(onSubmit)} className="mt-5 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase mb-1.5">Full Name</label>
              <input
                type="text"
                {...register("name", { required: "Name is required" })}
                className="w-full text-sm px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-pink-500"
                placeholder="Jane Doe"
              />
              {errors.name && <p className="text-red-500 text-[10px] mt-0.5">{errors.name.message}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase mb-1.5">Phone Number</label>
              <input
                type="tel"
                {...register("phone", { required: "Phone is required", minLength: { value: 10, message: "10 digits min" } })}
                className="w-full text-sm px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-pink-500"
                placeholder="9876543210"
              />
              {errors.phone && <p className="text-red-500 text-[10px] mt-0.5">{errors.phone.message}</p>}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase mb-1.5">Email Address</label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className="w-full text-sm px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-pink-500"
              placeholder="jane@example.com"
            />
            {errors.email && <p className="text-red-500 text-[10px] mt-0.5">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase mb-1.5">Mailing / City Address</label>
            <input
              type="text"
              {...register("address", { required: "Address details are required" })}
              className="w-full text-sm px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-pink-500"
              placeholder="Your home address"
            />
            {errors.address && <p className="text-red-500 text-[10px] mt-0.5">{errors.address.message}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4 pb-4 border-b border-gray-100 items-end">
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase mb-1.5">Number of Tickets</label>
              <input
                type="number"
                min={1}
                max={5}
                {...register("tickets", { required: true, min: 1, max: 5 })}
                className="w-full text-sm px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-pink-500 font-semibold"
              />
            </div>

            <div className="text-right">
              <p className="text-xs text-gray-400">Total Price</p>
              <p className="text-xl font-bold text-pink-600">
                {totalAmount === 0 ? "FREE" : `₹${totalAmount}`}
              </p>
            </div>
          </div>

          {/* Payment Submit Buttons */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold rounded-2xl hover:opacity-90 transition-all flex items-center justify-center gap-2 disabled:opacity-75"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="animate-spin h-5 w-5" />
                <span>Processing Order...</span>
              </>
            ) : (
              <>
                <CreditCard size={18} />
                <span>{pricePerTicket === 0 ? "Confirm Free Registration" : "Pay with Razorpay"}</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
