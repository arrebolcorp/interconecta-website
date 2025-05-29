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
  LabelList,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const CalculadoraROI = () => {
  const pdfRef = useRef();

  const [formData, setFormData] = useState({
    clinicName: '',
    establishmentType: 'consultorio',
    specialty: 'dermatologia',
    specificPlan: 'pro_plus',
    monthlyPatients: 80,
    whatsappMessages: 150,
    cancellationRate: 20,
    adminHours: 20,
    followupHours: 8,
    staffHourlyCost: 120,
    unansweredRate: 35,
    appointmentValue: 800,
    lostPatientsMonth: 15,
    afterHoursInquiries: 40
  });

  const [results, setResults] = useState({
    capturedPatients: 0,
    reducedCancellations: 0,
    timeSavings: 0,
    monthlySavings: 0,
    revenueIncrease: 0,
    totalBenefits: 0,
    monthlyCost: 0,
    netROI: 0,
    monthlyROI: 0,
    annualROI: 0,
    paybackPeriod: 0
  });

  // PRECIOS ACTUALIZADOS 2025
  const planPrices = {
    consultorio: {
      esencial_plus: 1500,
      pro_plus: 2500,
      premium_plus: 4000
    },
    clinica: {
      impulso_plus: 3500,
      crecimiento_plus: 6000,
      dominio_plus: 12000
    }
  };

  // SETUP COSTS (una sola vez)
  const setupCosts = {
    consultorio: {
      esencial_plus: 3000,
      pro_plus: 3000,
      premium_plus: 0 // Gratis en Premium
    },
    clinica: {
      impulso_plus: 5000,
      crecimiento_plus: 5000,
      dominio_plus: 0 // Gratis + Consultoría
    }
  };

  // ESPECIALIDADES MÉDICAS
  const specialties = {
    dermatologia: 'Dermatología Estética',
    cirugia_plastica: 'Cirugía Plástica',
    medicina_estetica: 'Medicina Estética',
    odontologia: 'Odontología',
    fisioterapia: 'Fisioterapia',
    clinica_general: 'Clínica General'
  };

  // PLANES DETALLADOS
  const planDetails = {
    consultorio: {
      esencial_plus: {
        name: 'Esencial Plus',
        features: ['WhatsApp Bot 24/7', 'Hasta 500 conversaciones/mes', 'Agenda digital', 'Recordatorios automáticos'],
        improvement: { capture: 0.25, cancellation: 0.50, time: 0.60 }
      },
      pro_plus: {
        name: 'Pro Plus',
        features: ['IA conversacional avanzada', 'Conversaciones ilimitadas', 'Seguimiento post-consulta', 'Campañas WhatsApp'],
        improvement: { capture: 0.35, cancellation: 0.60, time: 0.70 }
      },
      premium_plus: {
        name: 'Premium Plus',
        features: ['Multi-agente especializado', 'API integraciones', 'Análisis predictivo', 'Manager dedicado'],
        improvement: { capture: 0.45, cancellation: 0.70, time: 0.80 }
      }
    },
    clinica: {
      impulso_plus: {
        name: 'Impulso Plus',
        features: ['Multi-especialista', 'Coordinación doctores', 'Dashboard unificado', 'IA médica especializada'],
        improvement: { capture: 0.40, cancellation: 0.65, time: 0.75 }
      },
      crecimiento_plus: {
        name: 'Crecimiento Plus',
        features: ['Analytics avanzado', 'Multi-sucursal', 'Integración sistemas médicos', 'API completa'],
        improvement: { capture: 0.50, cancellation: 0.70, time: 0.80 }
      },
      dominio_plus: {
        name: 'Dominio Plus',
        features: ['Solución enterprise', 'Desarrollo personalizado', 'Servidores dedicados', 'SLA 99.9%'],
        improvement: { capture: 0.60, cancellation: 0.80, time: 0.85 }
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleEstablishmentChange = (e) => {
    const value = e.target.value;
    setFormData(prev => ({
      ...prev,
      establishmentType: value,
      specificPlan: value === 'consultorio' ? 'pro_plus' : 'crecimiento_plus'
    }));
  };

  const getPlanOptions = () => {
    const type = formData.establishmentType;
    return Object.keys(planDetails[type] || {});
  };

  const getCurrentPlan = () => {
    return planDetails[formData.establishmentType]?.[formData.specificPlan] || planDetails.consultorio.pro_plus;
  };

  const getPlanPrice = () => {
    return planPrices[formData.establishmentType]?.[formData.specificPlan] || 2500;
  };

  const getSetupCost = () => {
    return setupCosts[formData.establishmentType]?.[formData.specificPlan] || 3000;
  };

  const calculateResults = () => {
    const f = formData;
    const currentPlan = getCurrentPlan();
    const improvements = currentPlan.improvement;

    // Datos base
    const monthlyPatients = +f.monthlyPatients;
    const whatsappMessages = +f.whatsappMessages;
    const cancellationRate = +f.cancellationRate / 100;
    const adminHours = +f.adminHours;
    const followupHours = +f.followupHours;
    const staffHourlyCost = +f.staffHourlyCost;
    const unansweredRate = +f.unansweredRate / 100;
    const appointmentValue = +f.appointmentValue;
    const lostPatientsMonth = +f.lostPatientsMonth;
    const afterHoursInquiries = +f.afterHoursInquiries;

    // CÁLCULO DE BENEFICIOS SEGÚN NUEVA METODOLOGÍA

    // 1. CAPTURA DE PACIENTES PERDIDOS (24/7 + respuesta inmediata)
    const capturedPatients = lostPatientsMonth * improvements.capture;
    const capturedRevenue = capturedPatients * appointmentValue;

    // 2. REDUCCIÓN DE CANCELACIONES (recordatorios inteligentes)
    const currentCancellations = monthlyPatients * cancellationRate;
    const reducedCancellations = currentCancellations * improvements.cancellation;
    const cancellationRevenue = reducedCancellations * appointmentValue;

    // 3. AHORRO DE TIEMPO ADMINISTRATIVO
    const totalAdminHours = adminHours + followupHours;
    const timeSaved = totalAdminHours * improvements.time;
    const timeSavings = timeSaved * 4.3 * staffHourlyCost; // 4.3 semanas/mes

    // 4. CONVERSIONES DE CONSULTAS FUERA DE HORARIO
    const afterHoursConversions = afterHoursInquiries * 0.6; // 60% se convierte
    const afterHoursRevenue = afterHoursConversions * appointmentValue;

    // 5. MEJORA EN RECURRENCIA (seguimiento automatizado)
    const recurrenceImprovement = monthlyPatients * 0.15 * appointmentValue; // 15% más recurrencia

    // TOTALES
    const totalRevenueIncrease = capturedRevenue + cancellationRevenue + afterHoursRevenue + recurrenceImprovement;
    const totalSavings = timeSavings;
    const totalBenefits = totalRevenueIncrease + totalSavings;
    
    const monthlyCost = getPlanPrice();
    const setupCost = getSetupCost();
    
    // ROI CALCULATIONS
    const netMonthlyBenefit = totalBenefits - monthlyCost;
    const monthlyROI = monthlyCost > 0 ? (netMonthlyBenefit / monthlyCost) : 0;
    const annualROI = monthlyROI * 12;
    const paybackPeriod = setupCost / Math.max(netMonthlyBenefit, 1); // meses para recuperar setup

    setResults({
      capturedPatients: Math.round(capturedPatients),
      reducedCancellations: Math.round(reducedCancellations),
      timeSavings: Math.round(timeSaved),
      monthlySavings: Math.round(totalSavings),
      revenueIncrease: Math.round(totalRevenueIncrease),
      totalBenefits: Math.round(totalBenefits),
      monthlyCost,
      netROI: Math.round(netMonthlyBenefit),
      monthlyROI,
      annualROI,
      paybackPeriod: Math.max(paybackPeriod, 0.1),
      setupCost
    });
  };

  const exportToPDF = () => {
    const element = pdfRef.current;
    const opt = {
      margin: 0.5,
      filename: `ROI_Interconecta_${formData.clinicName || 'Analisis'}_2025.pdf`,
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

  const currentPlan = getCurrentPlan();
  const COLORS = ['#1A69FA', '#0F47B3', '#DEEEFF', '#E23838'];

  return (
    <div className="roi-calculator main-content" ref={pdfRef}>
      <header className="calculator-header">
        <div className="header-logo">
          <h1>📊 Calculadora ROI 2025</h1>
          <div className="brand-subtitle">Interconecta Capital - AI Partner del Área de la Salud</div>
        </div>
        <p>Descubre el potencial real de automatización médica con IA especializada</p>
      </header>

      {/* Información del Cliente */}
      <section className="section">
        <div className="section-header primary-bg">
          <h2>👨‍⚕️ Información del Cliente</h2>
        </div>
        <div className="section-content">
          <div className="grid-2">
            <div className="form-group">
              <label>Nombre de la Clínica/Consultorio</label>
              <input
                name="clinicName"
                value={formData.clinicName}
                onChange={handleInputChange}
                placeholder="Ej. Clínica Dermosalud"
              />
            </div>
            <div className="form-group">
              <label>Tipo de Establecimiento</label>
              <select name="establishmentType" value={formData.establishmentType} onChange={handleEstablishmentChange}>
                <option value="consultorio">Consultorio</option>
                <option value="clinica">Clínica</option>
              </select>
            </div>
            <div className="form-group">
              <label>Especialidad Médica</label>
              <select name="specialty" value={formData.specialty} onChange={handleInputChange}>
                {Object.entries(specialties).map(([key, name]) => (
                  <option key={key} value={key}>{name}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Plan Interconecta Recomendado</label>
              <select name="specificPlan" value={formData.specificPlan} onChange={handleInputChange}>
                {getPlanOptions().map(plan => (
                  <option key={plan} value={plan}>
                    {planDetails[formData.establishmentType][plan].name} - {formatCurrency(planPrices[formData.establishmentType][plan])}/mes
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Plan seleccionado details */}
          <div className="plan-preview">
            <h4>📋 {currentPlan.name} - Incluye:</h4>
            <ul>
              {currentPlan.features.map((feature, idx) => (
                <li key={idx}>✅ {feature}</li>
              ))}
            </ul>
            <div className="pricing-info">
              <strong>Inversión mensual: {formatCurrency(getPlanPrice())}</strong>
              {getSetupCost() > 0 && <span> + Setup inicial: {formatCurrency(getSetupCost())}</span>}
            </div>
          </div>
        </div>
      </section>

      {/* Situación Actual */}
      <section className="section">
        <div className="section-header">
          <h2>📈 Situación Actual de tu Práctica</h2>
        </div>
        <div className="section-content">
          <div className="grid-3">
            <div className="form-group">
              <label>Pacientes atendidos/mes</label>
              <input
                type="number"
                name="monthlyPatients"
                value={formData.monthlyPatients}
                onChange={handleInputChange}
                min={1}
              />
            </div>
            <div className="form-group">
              <label>Mensajes WhatsApp/día</label>
              <input
                type="number"
                name="whatsappMessages"
                value={formData.whatsappMessages}
                onChange={handleInputChange}
                min={0}
              />
            </div>
            <div className="form-group">
              <label>% Cancelaciones actuales</label>
              <input
                type="number"
                name="cancellationRate"
                value={formData.cancellationRate}
                onChange={handleInputChange}
                min={0}
                max={100}
              />
            </div>
            <div className="form-group">
              <label>Horas admin/semana</label>
              <input
                type="number"
                name="adminHours"
                value={formData.adminHours}
                onChange={handleInputChange}
                min={0}
              />
            </div>
            <div className="form-group">
              <label>Horas seguimiento/semana</label>
              <input
                type="number"
                name="followupHours"
                value={formData.followupHours}
                onChange={handleInputChange}
                min={0}
              />
            </div>
            <div className="form-group">
              <label>Costo hora personal (MXN)</label>
              <input
                type="number"
                name="staffHourlyCost"
                value={formData.staffHourlyCost}
                onChange={handleInputChange}
                min={0}
              />
            </div>
            <div className="form-group">
              <label>% Consultas sin respuesta</label>
              <input
                type="number"
                name="unansweredRate"
                value={formData.unansweredRate}
                onChange={handleInputChange}
                min={0}
                max={100}
              />
            </div>
            <div className="form-group">
              <label>Valor promedio consulta (MXN)</label>
              <input
                type="number"
                name="appointmentValue"
                value={formData.appointmentValue}
                onChange={handleInputChange}
                min={0}
              />
            </div>
            <div className="form-group">
              <label>Pacientes perdidos/mes</label>
              <input
                type="number"
                name="lostPatientsMonth"
                value={formData.lostPatientsMonth}
                onChange={handleInputChange}
                min={0}
              />
            </div>
            <div className="form-group">
              <label>Consultas fuera horario/mes</label>
              <input
                type="number"
                name="afterHoursInquiries"
                value={formData.afterHoursInquiries}
                onChange={handleInputChange}
                min={0}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Análisis Visual */}
      <section className="section">
        <div className="section-header primary-bg">
          <h2>📊 Análisis de Impacto</h2>
        </div>
        <div className="section-content">
          
          {/* Comparación Antes vs Después */}
          <h3 className="chart-title">💰 Comparación Mensual: Sin vs Con Interconecta</h3>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={[
              {
                name: "Ingresos Perdidos",
                "Sin Interconecta": formData.lostPatientsMonth * formData.appointmentValue + (formData.monthlyPatients * (formData.cancellationRate/100) * formData.appointmentValue),
                "Con Interconecta": (formData.lostPatientsMonth * formData.appointmentValue + (formData.monthlyPatients * (formData.cancellationRate/100) * formData.appointmentValue)) * 0.3
              },
              {
                name: "Costos Operativos",
                "Sin Interconecta": (formData.adminHours + formData.followupHours) * 4.3 * formData.staffHourlyCost,
                "Con Interconecta": ((formData.adminHours + formData.followupHours) * 4.3 * formData.staffHourlyCost * 0.3) + results.monthlyCost
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

          {/* Distribución de Beneficios */}
          <h3 className="chart-title">🎯 Distribución de Beneficios Mensuales</h3>
          <div className="charts-grid">
            <ResponsiveContainer width="100%" height={400}>
              <PieChart>
                <Pie
                  data={[
                    { 
                      name: 'Pacientes Recuperados', 
                      value: Math.max(results.capturedPatients * formData.appointmentValue, 1000),
                      label: `${results.capturedPatients} pacientes`
                    },
                    { 
                      name: 'Cancelaciones Evitadas', 
                      value: Math.max(results.reducedCancellations * formData.appointmentValue, 800),
                      label: `${results.reducedCancellations} citas`
                    },
                    { 
                      name: 'Ahorro Tiempo Admin', 
                      value: Math.max(results.monthlySavings, 500),
                      label: `${results.timeSavings} hrs/sem`
                    },
                    { 
                      name: 'Consultas Fuera Horario', 
                      value: Math.max(formData.afterHoursInquiries * 0.6 * formData.appointmentValue, 600),
                      label: `${Math.round(formData.afterHoursInquiries * 0.6)} consultas`
                    }
                  ]}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  label={({ name, value, label }) => `${name}: ${formatCurrency(value)}`}
                  outerRadius={120}
                  innerRadius={40}
                  fill="#8884d8"
                  dataKey="value"
                  fontSize={12}
                >
                  {COLORS.map((color, index) => (
                    <Cell key={`cell-${index}`} fill={color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value, name) => [formatCurrency(value), name]}
                  labelStyle={{ color: '#1C1C28' }}
                />
                <Legend 
                  verticalAlign="bottom" 
                  height={60}
                  formatter={(value) => <span style={{ color: '#1C1C28', fontSize: '12px' }}>{value}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          {/* Desglose detallado */}
          <div className="benefits-breakdown">
            <h4>💰 Desglose Detallado de Beneficios</h4>
            <div className="breakdown-grid">
              <div className="breakdown-item">
                <div className="breakdown-icon" style={{backgroundColor: COLORS[0]}}>👥</div>
                <div className="breakdown-content">
                  <strong>Pacientes Recuperados</strong>
                  <span>{results.capturedPatients} pacientes/mes</span>
                  <div className="breakdown-value">{formatCurrency(results.capturedPatients * formData.appointmentValue)}</div>
                </div>
              </div>
              <div className="breakdown-item">
                <div className="breakdown-icon" style={{backgroundColor: COLORS[1]}}>❌</div>
                <div className="breakdown-content">
                  <strong>Cancelaciones Evitadas</strong>
                  <span>{results.reducedCancellations} citas/mes</span>
                  <div className="breakdown-value">{formatCurrency(results.reducedCancellations * formData.appointmentValue)}</div>
                </div>
              </div>
              <div className="breakdown-item">
                <div className="breakdown-icon" style={{backgroundColor: COLORS[2]}}>⏰</div>
                <div className="breakdown-content">
                  <strong>Ahorro Tiempo Admin</strong>
                  <span>{results.timeSavings} hrs/semana</span>
                  <div className="breakdown-value">{formatCurrency(results.monthlySavings)}</div>
                </div>
              </div>
              <div className="breakdown-item">
                <div className="breakdown-icon" style={{backgroundColor: COLORS[3]}}>🌙</div>
                <div className="breakdown-content">
                  <strong>Consultas Nocturnas</strong>
                  <span>{Math.round(formData.afterHoursInquiries * 0.6)} consultas/mes</span>
                  <div className="breakdown-value">{formatCurrency(formData.afterHoursInquiries * 0.6 * formData.appointmentValue)}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Resultados ROI */}
      <section className="section">
        <div className="section-header success-bg">
          <h2>🚀 Resultados de ROI Proyectados</h2>
        </div>
        <div className="section-content">
          <div className="roi-summary">
            <div className="roi-main-metric">
              <h2>ROI Mensual: {formatPercent(results.monthlyROI)}</h2>
              <p>Beneficio neto mensual: {formatCurrency(results.netROI)}</p>
            </div>
          </div>

          <div className="results-grid">
            <div className="result-card primary">
              <h4>👥 Pacientes Recuperados</h4>
              <div className="value">{results.capturedPatients} pacientes/mes</div>
              <small>+{formatCurrency(results.capturedPatients * formData.appointmentValue)} en ingresos</small>
            </div>

            <div className="result-card primary">
              <h4>❌ Cancelaciones Evitadas</h4>
              <div className="value">{results.reducedCancellations} citas/mes</div>
              <small>+{formatCurrency(results.reducedCancellations * formData.appointmentValue)} recuperados</small>
            </div>

            <div className="result-card primary">
              <h4>⏰ Tiempo Ahorrado</h4>
              <div className="value">{results.timeSavings} hrs/sem</div>
              <small>{formatCurrency(results.monthlySavings)} en ahorro mensual</small>
            </div>

            <div className="result-card success">
              <h4>💰 Beneficio Total Mensual</h4>
              <div className="value">{formatCurrency(results.totalBenefits)}</div>
              <small>Ingresos adicionales + Ahorros</small>
            </div>

            <div className="result-card warning">
              <h4>💳 Inversión Mensual</h4>
              <div className="value">{formatCurrency(results.monthlyCost)}</div>
              <small>Plan {currentPlan.name}</small>
            </div>

            <div className="result-card success total">
              <h4>📈 ROI Anual</h4>
              <div className="value">{formatPercent(results.annualROI)}</div>
              <small>Retorno anual sobre inversión</small>
            </div>

            <div className="result-card info">
              <h4>⏱️ Recuperación Setup</h4>
              <div className="value">{results.paybackPeriod.toFixed(1)} meses</div>
              <small>Para recuperar {formatCurrency(results.setupCost || 0)}</small>
            </div>

            <div className="result-card total">
              <h4>💎 Beneficio Neto</h4>
              <div className="value">{formatCurrency(results.netROI)}</div>
              <small>Después de pagar la mensualidad</small>
            </div>
          </div>
        </div>
      </section>

      {/* Proyección 12 meses */}
      <section className="section">
        <div className="section-header">
          <h2>📈 Proyección 12 Meses</h2>
        </div>
        <div className="section-content">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={Array.from({length: 12}, (_, i) => ({
              mes: `Mes ${i + 1}`,
              beneficio: results.netROI,
              acumulado: results.netROI * (i + 1)
            }))}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mes" />
              <YAxis tickFormatter={formatCurrency} />
              <Tooltip formatter={formatCurrency} />
              <Legend />
              <Bar dataKey="beneficio" fill="#1A69FA" name="Beneficio Mensual" />
              <Bar dataKey="acumulado" fill="#0F47B3" name="Beneficio Acumulado" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* Casos de Éxito */}
      <section className="section">
        <div className="section-header">
          <h2>🏆 Casos de Éxito Reales</h2>
        </div>
        <div className="section-content">
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <h4>Dra. María González - Dermatología</h4>
              <p>"Aumenté 40% mis consultas en 2 meses. Antes perdía 15 pacientes al mes por no responder a tiempo. Ahora mi bot captura el 95% de consultas."</p>
              <div className="result">ROI: 400% primer mes</div>
            </div>
            <div className="testimonial-card">
              <h4>Dr. Carlos Ruiz - Cirugía Plástica</h4>
              <p>"Mi consultorio funciona mientras duermo. La automatización de WhatsApp cambió completamente mi práctica."</p>
              <div className="result">Ahorro: 20 horas/semana</div>
            </div>
            <div className="testimonial-card">
              <h4>Clínica Bellezza - Guadalajara</h4>
              <p>"Coordinábamos 3 especialistas manualmente. Ahora todo fluye automático sin conflictos ni errores."</p>
              <div className="result">ROI: 400% primer trimestre</div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="section cta-section">
        <div className="section-content">
          <h2>🚀 ¿Listo para transformar tu práctica médica?</h2>
          <p>Agenda una demostración personalizada de 15 minutos y ve cómo funcionaría en TU consultorio específicamente.</p>
          <div className="cta-buttons">
            <button className="button primary" onClick={() => window.open('https://interconecta.capital/reuniones', '_blank')}>
              📅 Agendar Demo Gratuita
            </button>
            <button className="button secondary" onClick={exportToPDF}>
              📄 Descargar Análisis PDF
            </button>
          </div>
        </div>
      </section>

      <div className="calculator-footer">
        <div className="footer-content">
          <div className="footer-brand">
            <h3>Interconecta Capital</h3>
            <p>Tu Chief AI Officer médico fraccional</p>
          </div>
          <div className="footer-contact">
            <p>📧 hola@interconecta.capital</p>
            <p>🌐 www.interconecta.capital</p>
            <p>📱 WhatsApp: +52 56 5162 2408</p>
          </div>
        </div>
        <div className="footer-disclaimer">
          <p>© 2025 Interconecta Capital | Automatización con propósito humano | Resultados basados en casos reales de clientes</p>
        </div>
      </div>
    </div>
  );
};

export default CalculadoraROI;