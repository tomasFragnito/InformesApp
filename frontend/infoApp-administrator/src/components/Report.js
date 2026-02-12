import React, {useState} from 'react';
import { useReportsPaginated, downloadFile, deleteReport  } from "../scripts/Callback";

export const Report = () => {
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState({ field: "id", dir: "asc" });

  const hasSelectedReports = () => selected.length > 0;

  const [downloaded, setDownloaded] = useState([]);

  const [refreshKey, setRefreshKey] = useState(0);

  const result = useReportsPaginated(page, refreshKey);
  if (!result) return <div class="spinner-border" role="status"> <span class="visually-hidden">Loading...</span> </div>;

  let listPagesTotal = [];

  if (result.totalPages > 0) {
    for (let i = 1; i <= result.totalPages; i++) {
      listPagesTotal.push(i);
    }
  } else {
    listPagesTotal = [];
  }

  const handleSort = (field) => {
    setSort(prev => {
      let newDir = "asc";

      if (prev.field === field) {
        if (prev.dir === "asc") {
          newDir = "desc";
        } else {
          newDir = "asc";
        }
      }

      return {
        field: field,
        dir: newDir
      };
    });
  };

  const sortedData = [...result.data].sort((a, b) => {
    let A = a[sort.field];
    let B = b[sort.field];

    if (sort.field === "created_at") {
      A = new Date(A);
      B = new Date(B);
    }

    if (A > B) {
      if (sort.dir === "asc") {
        return 1;
      } else {
        return -1;
      }
    }

    if (A < B) {
      if (sort.dir === "asc") {
        return -1;
      } else {
        return 1;
      }
    }

    return 0;
  });

  //funcion wrapper para boton descargas
  const handleDownload = async (file) => {
    if (downloaded.includes(file.id)) return;

    setDownloaded(prev => [...prev, file.id]);

    try {
      await downloadFile(file.id, file.filename);
    } catch (e) {
      // si falla, liberamos el botón
      setDownloaded(prev => prev.filter(id => id !== file.id));
    }
  };

  //funcion wrapper para boton eliminar report
  const handleDelete = async () => {
    try {
      for (const id of selected) {
        await deleteReport(id);
      }

      setSelected([]); // limpiar seleccion
      setRefreshKey(k => k + 1); // refrescar pag

    } catch (err) {
      console.error("Error al borrar:", err);
    }
  };

  //funcion para recortar el texcto si supera los 20 caracteres
  const truncate = (text, max = 20) => {
    if (!text) return "";
    return text.length > max ? text.slice(0, max) + "..." : text;
  };

  return (
    <>

    {/*barra de seleccionados*/}
    {hasSelectedReports() && (
      <div className="bulk-actions-bar">
        <div className="d-flex gap-2 align-items-center p-2 border rounded shadow-sm">
          <span className="me-auto small text-muted">
            {selected.length} seleccionados
          </span>

          <button className="btn btn-sm btn-danger" onClick={() => handleDelete()}>
            Eliminar
          </button>

          <button className="btn btn-sm btn-secondary">
            Exportar
          </button>

          <button
            type="button" className="small btn-close" aria-label="Close" 
            onClick={() => setSelected([])}>
          </button>
        </div>
      </div>
    )}

    <div className="container mt-3 fw-bold text-center border border-secondary rounded p-2">
      <div className="row align-items-center">

        {/* CHECK TODOS */}
        <div className="col-1 text-center">
          <input
            type="checkbox"
            checked={
              sortedData.length > 0 &&
              sortedData.every(r => selected.includes(r.id))
            }
            onChange={(e) => {
              if (e.target.checked) {
                setSelected(sortedData.map(r => r.id));
              } else {
                setSelected([]);
              }
          }}
        />
      </div>

      <div className="col-1" onClick={() => handleSort("id")} style={{ cursor: "pointer" }}>
        <span className="d-inline-flex align-items-center">
          ID
          {sort.field === "id" && (
            <span className="ms-1 small">
              {sort.dir === "asc" ? "▲" : "▼"}
            </span>
          )}
        </span>
      </div>

      <div className="col-2" onClick={() => handleSort("reason")} style={{ cursor: "pointer" }}>
        <span className="d-inline-flex align-items-center">
          Reason
          {sort.field === "reason" && (
            <span className="ms-1 small">
              {sort.dir === "asc" ? "▲" : "▼"}
            </span>
          )}
        </span>
      </div>

      <div className="col-3" onClick={() => handleSort("note")} style={{ cursor: "pointer" }}>
        <span className="d-inline-flex align-items-center">
          Note
          {sort.field === "note" && (
            <span className="ms-1 small">
              {sort.dir === "asc" ? "▲" : "▼"}
            </span>
          )}
        </span>
      </div>

      <div className="col-2" onClick={() => handleSort("created_at")} style={{ cursor: "pointer" }}>
        <span className="d-inline-flex align-items-center">
          Date
          {sort.field === "created_at" && (
            <span className="ms-1 small">
              {sort.dir === "asc" ? "▲" : "▼"}
            </span>
          )}
        </span>
      </div>

      <div className="col-3">Files</div>
    </div>
  </div>

  {/*filas de reportes*/}
  <div className="container mt-2">
    {sortedData.length === 0 ? (
      <p className="text-center sin-reportes small">Sin reportes</p>
    ) : (
      sortedData.map(report => (
        <div className="card mb-1" id="cardReport" key={report.id}>
          <div className="card-body py-1 px-1 small">
            <div className="row text-center align-items-center">
              <div className="col-1 text-center">
                <input
                  type="checkbox"
                  checked={selected.includes(report.id)}
                  onChange={() => {
                    setSelected(prev =>
                      prev.includes(report.id)
                        ? prev.filter(id => id !== report.id)
                        : [...prev, report.id]
                    );
                  }}
                />
              </div>

              <div className="col-1">{report.id}</div>
              <div className="col-2">{truncate(report.reason)}</div>
              <div className="col-3">{truncate(report.note)}</div>
              <div className="col-2">
                {new Date(report.created_at).toLocaleDateString()}
              </div>

              <div className="col-3">
                {report.Files?.map(file => (
                  <div key={file.id}>
                    <div className="fw-bold small">{file.filename}</div>
                    <button
                      className="btn btn-sm btn-primary"
                      disabled={downloaded.includes(file.id)}
                      onClick={() => handleDownload(file)}
                    >
                      {downloaded.includes(file.id) ? "Descargado" : "Descargar"}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))
    )}
  </div>

  {/* PAGINACION */}
  <nav aria-label="Page navigation example" className="d-flex justify-content-center mt-4">
    <ul className="pagination mb-0">

      <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
        <button
          className="page-link"
          onClick={() => setPage(p => p - 1)}
          disabled={page === 1}
        >
          Previous
        </button>
      </li>

    {(() => {
      if (listPagesTotal.length  > 1) {
        return (
          <li className="page-item d-flex">
            {listPagesTotal.map(i => (
              <span key={i}>
                <button
                  onClick={() => setPage(i)}
                  className="page-link"
                >
                  {i}
                </button>
              </span>
            ))}
          </li>
        );
      }

        return null;
      })()}

      <li className={`page-item ${page === result.totalPages ? "disabled" : ""}`}>
        <button
          className="page-link"
          onClick={() => setPage(p => p + 1)}
          disabled={page === result.totalPages}
        >Next
        </button>
      </li>

        </ul>
    </nav>

    </>
  );
};
