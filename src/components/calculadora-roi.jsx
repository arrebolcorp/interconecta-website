import React, { useState, useEffect, useRef } from "react";
import html2pdf from "html2pdf.js";
import "../assets/css/calculadora-roi.css";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  LabelList
} from 'recharts';


const CalculadoraROI = () => {
  const pdfRef = useRef();

  const [formData, setFormData] = useState({
    clinicName: '',
    establishmentType: 'Consultorio',
    planType: 'Planes Consultorio',
    specificPlan: 'Plan Pro',
    monthlyAppointments: 75,
    cancellationRate: 25,
    scheduleHours: 10,
    followupHours: 5,
    staffHourlyCost: 100,
    unansweredRate: 20,
    appointmentValue: 600
  });

  const [results, setResults] = useState({
    reducedCancellations: 0,
    scheduleTimeSavings: 0,
    followupTimeSavings: 0,
    monthlySavings: 0,
    increasedConversions: 0,
    revenueIncrease: 0,
    totalSavings: 0,
    monthlyCost: 0,
    monthlyROI: 0,
    annualROI: 0
  });

  const planPrices = {
    Consultorio: {
      'Plan Esencial': 890,
      'Plan Pro': 1490,
      'Plan Premium': 2490
    },
    Clínica: {
      'Plan Impulso': 2388,
      'Plan Crecimiento': 4788,
      'Plan Dominio': 8988
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePlanTypeChange = (e) => {
    const value = e.target.value;
    setFormData(prev => ({
      ...prev,
      planType: value,
      specificPlan: value === 'Planes Consultorio' ? 'Plan Pro' : 'Plan Crecimiento'
    }));
  };

  const getPlanOptions = () => formData.planType === 'Planes Consultorio'
    ? ['Plan Esencial', 'Plan Pro', 'Plan Premium']
    : ['Plan Impulso', 'Plan Crecimiento', 'Plan Dominio'];

  const getPlanPrice = () =>
    planPrices[formData.establishmentType]?.[formData.specificPlan] || 0;

  const calculateResults = () => {
    const f = formData;
    const appts = +f.monthlyAppointments;
    const cancel = +f.cancellationRate;
    const sch = +f.scheduleHours;
    const fol = +f.followupHours;
    const rate = +f.staffHourlyCost;
    const noAns = +f.unansweredRate;
    const val = +f.appointmentValue;

    const reducedCancellations = appts * 0.6;
    const scheduleTimeSavings = sch * 0.8;
    const followupTimeSavings = fol * 0.75;
    const monthlySavings = (scheduleTimeSavings + followupTimeSavings) * 4.3 * rate;
    const increasedConversions = appts * (1 - noAns / 100) * 0.15;
    const revenueIncrease = increasedConversions * val;
    const totalSavings = monthlySavings + revenueIncrease;
    const monthlyCost = getPlanPrice();
    const monthlyROI = monthlyCost > 0 ? (totalSavings / monthlyCost) - 1 : 0;
    const annualROI = monthlyROI * 12;

    setResults({
      reducedCancellations,
      scheduleTimeSavings,
      followupTimeSavings,
      monthlySavings,
      increasedConversions,
      revenueIncrease,
      totalSavings,
      monthlyCost,
      monthlyROI,
      annualROI
    });
  };

  const exportToPDF = () => {
    const element = pdfRef.current;
    const opt = {
      margin: 0.5,
      filename: `ROI_${formData.clinicName || 'Interconecta'}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
      pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
    };
    html2pdf().set(opt).from(element).save();
  };

  useEffect(() => {
    calculateResults();
  }, [formData]);

  const formatCurrency = v =>
    new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(v);

  const formatPercent = v => `${(v * 100).toFixed(1)}%`;

  return (
    <div className="roi-calculator main-content" ref={pdfRef}>
      <header className="calculator-header">
        <h1>📊 Calculadora ROI - Interconecta</h1>
        <p>Descubre el potencial de automatización en tu clínica o consultorio</p>
      </header>

      {/* Información */}
      <section className="section">
        <div className="section-header">
          <h2>Información</h2>
        </div>
        <div className="section-content">
          <div className="form-group">
            <label>Nombre de la Clínica/Consultorio</label>
            <input
              name="clinicName"
              value={formData.clinicName}
              onChange={handleInputChange}
              placeholder="Ej. Dermosalud"
            />
          </div>
          <div className="form-group">
            <label>Tipo de Establecimiento</label>
            <select name="establishmentType" value={formData.establishmentType} onChange={handleInputChange}>
              <option value="Consultorio">Consultorio</option>
              <option value="Clínica">Clínica</option>
            </select>
          </div>
          <div className="form-group">
            <label>Tipo de Plan</label>
            <select name="planType" value={formData.planType} onChange={handlePlanTypeChange}>
              <option value="Planes Consultorio">Planes Consultorio</option>
              <option value="Planes Clínica">Planes Clínica</option>
            </select>
          </div>
          <div className="form-group">
            <label>Plan Específico</label>
            <select name="specificPlan" value={formData.specificPlan} onChange={handleInputChange}>
              {getPlanOptions().map(plan => (
                <option key={plan} value={plan}>{plan}</option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* Parámetros */}
      <section className="section">
        <div className="section-header">
          <h2>Parámetros Actuales</h2>
        </div>
        <div className="section-content">
          {[
            { label: "Citas mensuales", name: "monthlyAppointments" },
            { label: "% Cancelaciones", name: "cancellationRate" },
            { label: "Horas agenda/sem", name: "scheduleHours" },
            { label: "Horas seguimiento/sem", name: "followupHours" },
            { label: "Costo por hora (MXN)", name: "staffHourlyCost" },
            { label: "% sin respuesta", name: "unansweredRate" },
            { label: "Valor cita (MXN)", name: "appointmentValue" },
          ].map(({ label, name }) => (
            <div key={name} className="form-group">
              <label>{label}</label>
              <input
                type="number"
                name={name}
                value={formData[name]}
                onChange={handleInputChange}
                min={0}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Sección Gráficas */}
<section className="section">
  <div className="section-header primary-bg">
    <h2>Análisis Visual</h2>
  </div>
  <div className="section-content">

    {/* Comparación de Costos y Pérdidas */}
    <h3 className="chart-title">Costos y Pérdidas</h3>
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={[
        {
          name: "Costos Operativos",
          "Sin Interconecta": ((formData.scheduleHours + formData.followupHours) * 4.3 * formData.staffHourlyCost),
          "Con Interconecta": ((formData.scheduleHours + formData.followupHours) * 4.3 * formData.staffHourlyCost * 0.25 + results.monthlyCost)
        },
        {
          name: "Pérdidas por Cancelaciones",
          "Sin Interconecta": (formData.monthlyAppointments * (formData.cancellationRate / 100) * formData.appointmentValue),
          "Con Interconecta": (formData.monthlyAppointments * (formData.cancellationRate / 100) * 0.4 * formData.appointmentValue)
        }
      ]}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis tickFormatter={formatCurrency} />
        <Tooltip formatter={formatCurrency} />
        <Legend />
        <Bar dataKey="Sin Interconecta" fill="#E23838">
  <LabelList dataKey="Sin Interconecta" position="top" formatter={formatCurrency} />
</Bar>

<Bar dataKey="Con Interconecta" fill="#1A69FA">
  <LabelList dataKey="Con Interconecta" position="top" formatter={formatCurrency} />
</Bar>
      </BarChart>
    </ResponsiveContainer>

    {/* Citas Perdidas */}
    <h3 className="chart-title">Citas Perdidas</h3>
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={[
        {
          name: "Citas Perdidas",
          "Sin Interconecta": formData.monthlyAppointments * (formData.cancellationRate / 100),
          "Con Interconecta": formData.monthlyAppointments * (formData.cancellationRate / 100) * 0.4
        }
      ]}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="Sin Interconecta" fill="#E23838">
  <LabelList dataKey="Sin Interconecta" position="top" />
</Bar>

<Bar dataKey="Con Interconecta" fill="#1A69FA">
  <LabelList dataKey="Con Interconecta" position="top" />
</Bar>

      </BarChart>
    </ResponsiveContainer>
  </div>
</section>


      {/* Resultados */}
      <section className="section">
  <div className="section-header">
    <h2>Resultados Proyectados</h2>
  </div>
  <div className="section-content resultados-grid">
    {[
      { label: "Cancelaciones evitadas", value: `${results.reducedCancellations.toFixed(1)} citas/mes` },
      { label: "Tiempo ahorrado en agenda", value: `${results.scheduleTimeSavings.toFixed(1)} hrs/sem` },
      { label: "Tiempo ahorrado en seguimiento", value: `${results.followupTimeSavings.toFixed(1)} hrs/sem` },
      { label: "Ahorro mensual", value: formatCurrency(results.monthlySavings) },
      { label: "Conversiones aumentadas", value: `${results.increasedConversions.toFixed(1)} citas/mes` },
      { label: "Ingresos adicionales", value: formatCurrency(results.revenueIncrease) },
      { label: "Total ahorro mensual", value: formatCurrency(results.totalSavings), total: true },
      { label: "Costo mensual", value: formatCurrency(results.monthlyCost), total: true },
      { label: "ROI mensual", value: formatPercent(results.monthlyROI), total: true },
      { label: "ROI anual", value: formatPercent(results.annualROI), total: true },
    ].map(({ label, value, total }) => (
      <div key={label} className={`result-card ${total ? 'total' : ''}`}>
        <h4>{label}</h4>
        <div className="value">{value}</div>
      </div>
    ))}
  </div>
</section>

      {/* Exportar PDF */}
      <div className="export-section">
        <button className="button" onClick={exportToPDF}>
          📄 Guardar como PDF
        </button>
      </div>

      <div className="calculator-footer">
        <p>© 2025 Interconecta Capital | www.interconecta.capital | hola@interconecta.capital</p>
      </div>
    </div>
  );
};

export default CalculadoraROI;
