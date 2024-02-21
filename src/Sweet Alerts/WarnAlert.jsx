import React from 'react'
import Swal from 'sweetalert2';

const WarnAlert = (Massage) => {
   const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 1000,
      timerProgressBar: true,
      didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
      }
   });
   
   Toast.fire({
      icon: "warning",
      title: Massage
   });
}

export default WarnAlert
