"use client";

import { useEffect } from "react";

// Cargar Bootstrap JavaScript solo en el cliente
    const loadBootstrap = async () => {
        if (process.env.NODE_ENV === 'development') {
    await import('bootstrap/dist/js/bootstrap.bundle.js');
    } else {
         await import('bootstrap/dist/js/bootstrap.bundle.min.js');
    }
};