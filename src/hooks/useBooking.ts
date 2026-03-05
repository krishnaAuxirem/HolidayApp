import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Booking } from '@/types';

export const useBooking = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    if (user) {
      const storedBookings = localStorage.getItem(`bookings_${user.id}`);
      setBookings(storedBookings ? JSON.parse(storedBookings) : []);
    }
  }, [user]);

  const createBooking = (
    packageId: string,
    packageTitle: string,
    destination: string,
    travelers: number,
    totalPrice: number,
    travelDate: string
  ) => {
    if (!user) return;

    const newBooking: Booking = {
      id: `booking-${Date.now()}`,
      packageId,
      packageTitle,
      destination,
      travelers,
      totalPrice,
      bookingDate: new Date().toISOString(),
      travelDate,
      status: 'confirmed'
    };

    const updatedBookings = [...bookings, newBooking];
    setBookings(updatedBookings);
    localStorage.setItem(`bookings_${user.id}`, JSON.stringify(updatedBookings));
    
    return newBooking;
  };

  const cancelBooking = (bookingId: string) => {
    if (!user) return;

    const updatedBookings = bookings.map(booking =>
      booking.id === bookingId ? { ...booking, status: 'cancelled' as const } : booking
    );
    
    setBookings(updatedBookings);
    localStorage.setItem(`bookings_${user.id}`, JSON.stringify(updatedBookings));
  };

  return { bookings, createBooking, cancelBooking };
};
