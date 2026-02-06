import { useState, useEffect } from 'react';

//const DNS = "http://fragapp.duckdns.org";
const API_URL  = "http://localhost:3000";

export const useReport = (id) => {
    const [data, setData] = useState(null);

    useEffect(() => {
        fetch(API_URL +"/api/reports/"+id, {method: "GET"})
            .then((res) => res.json())
            .then((data) => setData(data));
    }, [id]);

    return data;
}

export const useFile = (id) => {
    const [data, setData] = useState(null);

    useEffect(() => {
        fetch(API_URL +"/api/files/"+id, {method: "GET"})
            .then((res) => res.json())
            .then((data) => setData(data));
    }, [id]);

    return data;
}

export const downloadFile = async (id, filename) => {

  const res = await fetch(API_URL + "/api/files/download/"+id);

  if (!res.ok) {
    throw new Error("Error al descargar archivo");
  }

  const blob = await res.blob();

  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");

  a.href = url;
  a.download = filename;
  a.click();

  window.URL.revokeObjectURL(url);
};

export const useReportsPaginated = (page) => {
    const [data, setData] = useState({
        data: [],
        page: 1,
        totalPages: 1
    });

    useEffect(() => {
    fetch(API_URL + "/api/reports/pag?page=" + page)
        .then(res => res.json())
        .then(setData)
        .catch(() => {
            setData({ data: [], page: 1, totalPages: 1 });
        });
    }, [page]);

    return data;
};

export const deleteReport = async (id) => {
  const res = await fetch(API_URL + "/api/reports/" + id, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Error al eliminar reporte");
  }

  return await res.json();
};