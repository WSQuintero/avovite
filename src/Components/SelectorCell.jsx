import { MenuItem, Select, CircularProgress } from "@mui/material";
import { useMemo, useState } from "react";
import ContractService from "../Services/contract.service";
import useSession from "../Hooks/useSession";

const SelectorCell = ({ row }) => {
  const [{ token }] = useSession();
  const $Contract = useMemo(() => new ContractService(token), [token]);
  const [selectedOption, setSelectedOption] = useState("selection");
  const [downloading, setDownloading] = useState(false);

  const handleOptionSelect = async (key, id) => {
    const option = options.find((opt) => opt.key === key);
    if (option) {
      setDownloading(true);
      await option.handler(id);
      setDownloading(false);
    }
  };

  const handleDownloadbondingForm = async (id) => {
    setDownloading(true);
    setTimeout(() => {
      console.log(id);
      setDownloading(false);
    }, 2000);
  };

  const handleDownloadPayroll = async (id) => {
    try {
      const { status, data } = await $Contract.exportPayRollSheet({ id: id });
      if (status) {
        window.open(data.data, "_blank");
      }
    } catch (error) {
      console.error("Error al exportar la planilla de pago:", error);
    }
  };

  const handleDownloadPropertyCertificate = async (id) => {
    try {
      const { status, data } = await $Contract.exportPropietyCertificate({ id: id });
      if (status) {
        const pdfUrl = data.data.datapdf;
        window.open(pdfUrl, "_blank");
      } else {
        console.error("Error al exportar el certificado de propiedad");
      }
    } catch (error) {
      console.error("Error en la solicitud de descarga del certificado de propiedad:", error);
    }
  };

  const handleDownloadContract = async (id) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/contracts/files/${id}`);
      const blob = await response.blob();
      const pdfUrl = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = pdfUrl;
      link.download = "contrato.pdf";
      document.body.appendChild(link);

      link.click();

      document.body.removeChild(link);
    } catch (error) {
      console.error("Error en la solicitud de descarga del contrato:", error);
    }
  };

  const options = [
    { key: "selection", label: "Documento a descargar" },
    { key: "download_contract", label: "Contrato", handler: handleDownloadContract },
    { key: "download_property_certificate", label: "Certificado Propiedad", handler: handleDownloadPropertyCertificate },
    { key: "download_bonding_form", label: "Formulario Vinculación", handler: handleDownloadbondingForm },
    { key: "download_payroll", label: "Planilla Pago", handler: handleDownloadPayroll },
  ];

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
    handleOptionSelect(event.target.value, row.original.id);
  };

  return (
    <Select value={selectedOption} onChange={handleChange} size="small">
      {options.map((option) => (
        <MenuItem key={option.key} value={option.key} disabled={option.key === "selection"}>
          {downloading && option.key === selectedOption ? (
            <CircularProgress size={16} color="inherit" /> // Loader mientras se descarga el contrato
          ) : (
            option.label
          )}
        </MenuItem>
      ))}
    </Select>
  );
};

export default SelectorCell;
