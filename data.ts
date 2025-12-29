import { ModuleData, BrandColors } from './types';

export const modules: ModuleData[] = [
  {
    id: "M1",
    title: "Qué es un Trigger: el origen del flujo",
    key_message: "El trigger no hace trabajo: solo despierta el flujo.",
    simple_explanation: "Un Trigger es el evento que pone en marcha la automatización. Sin trigger, el flujo no existe. Puede ser por tiempo, un evento en una app o una solicitud externa.",
    analogy: "Es como un sensor de movimiento que detecta a alguien y activa una alarma. El sensor no atrapa al ladrón, solo avisa que hay alguien.",
    business_example: "Cuando se crea un nuevo lead en un formulario web, ese evento 'Nuevo Envío' es el Trigger.",
    mini_exercise: {
      prompt: "Escenario: 'Cada vez que llegue un correo nuevo del cliente'. ¿Cuál es el Trigger?",
      expected_answer: "La llegada de un correo nuevo (evento) es el Trigger.",
      placeholder: "Escribe tu respuesta aquí..."
    },
    connectionType: 'linear',
    nodes: [
      { id: '1', label: "TRIGGER: Evento detectado", type: 'trigger', color: BrandColors.trigger }
    ]
  },
  {
    id: "M2",
    title: "Qué es una Acción: la respuesta del sistema",
    key_message: "La acción es donde ocurre el valor.",
    simple_explanation: "Una Acción es cualquier tarea que se ejecuta después del trigger: guardar, notificar, crear registros, llamar una IA, etc.",
    analogy: "Después de que suena el timbre (trigger), tú abres la puerta (acción).",
    business_example: "Cuando un lead llega (Trigger), se crea el registro en CRM (Acción 1) y se notifica al asesor comercial (Acción 2).",
    mini_exercise: {
      prompt: "Escenario: 'Cuando llegue un lead, guárdalo en la base y avisa al equipo'. Lista las 2 Acciones.",
      expected_answer: "1. Guardar en la base de datos\n2. Enviar notificación al equipo"
    },
    connectionType: 'linear',
    nodes: [
      { id: '1', label: "TRIGGER", type: 'trigger', color: BrandColors.trigger },
      { id: '2', label: "ACCIÓN 1: Guardar", type: 'action', color: BrandColors.action },
      { id: '3', label: "ACCIÓN 2: Notificar", type: 'action', color: BrandColors.action }
    ]
  },
  {
    id: "M3",
    title: "Cadena Trigger–Acción: la automatización mínima viable",
    key_message: "Trigger → Acciones → Resultado. Este patrón es el 90% de la automatización.",
    simple_explanation: "La automatización base es una secuencia: un evento activa un conjunto de acciones que producen un resultado medible.",
    analogy: "Línea de producción: Entrada (Materia prima) → Proceso (Transformación) → Salida (Producto).",
    business_example: "Cuando un cliente llena un formulario → se guarda → se envía correo → se agenda seguimiento.",
    mini_exercise: {
      prompt: "Convierte este proceso en cadena Trigger–Acción: 'Cuando un pedido se crea, guardar datos y enviar confirmación'.",
      expected_answer: "Trigger: Pedido creado\nAcción 1: Guardar datos del pedido\nAcción 2: Enviar confirmación"
    },
    connectionType: 'linear',
    nodes: [
      { id: '1', label: "TRIGGER: Evento", type: 'trigger', color: BrandColors.trigger },
      { id: '2', label: "ACCIÓN: Procesar", type: 'action', color: BrandColors.action },
      { id: '3', label: "ACCIÓN: Notificar", type: 'action', color: BrandColors.action },
      { id: '4', label: "RESULTADO: Impacto", type: 'result', color: BrandColors.result }
    ]
  },
  {
    id: "M4",
    title: "Cuando la lógica se complica: extender sin romper",
    key_message: "La complejidad no rompe Trigger–Acción: solo lo extiende.",
    simple_explanation: "En automatizaciones reales, no siempre se ejecuta todo linealmente. A veces hay decisiones (si/no), esperas o ciclos.",
    analogy: "En una carretera, no todos los autos van al mismo destino. Hay intersecciones donde decides girar a la izquierda o derecha.",
    business_example: "Si el lead es 'alto valor', notificar a ventas inmediatamente. Si es 'bajo valor', enviarlo a una lista de correos mensual.",
    mini_exercise: {
      prompt: "Escenario: 'Si el cliente es premium, enviar WhatsApp; si no, enviar email'. ¿Qué elemento lógico se agregó?",
      expected_answer: "Se agregó una Decisión (ramificación condicional)."
    },
    connectionType: 'branching',
    nodes: [
      { id: '1', label: "TRIGGER", type: 'trigger', color: BrandColors.trigger },
      { id: '2', label: "DECISIÓN: ¿Es Premium?", type: 'decision', color: BrandColors.action },
      { id: '3a', label: "SÍ: Enviar WhatsApp", type: 'action', color: BrandColors.action },
      { id: '3b', label: "NO: Enviar Email", type: 'action', color: BrandColors.action }
    ]
  },
  {
    id: "M5",
    title: "Diseñar sin herramienta: pensamiento estructural",
    key_message: "Primero se diseña la lógica; después se implementa en n8n.",
    simple_explanation: "El estudiante aprende a identificar triggers, acciones y resultados antes de abrir el software. Esto reduce errores drásticamente.",
    analogy: "Un arquitecto dibuja los planos antes de poner el primer ladrillo.",
    business_example: "Capstone: Mentoría agendada -> Registrar en BD -> Confirmar al usuario -> Notificar al equipo -> Operación Exitosa.",
    mini_exercise: {
      prompt: "Caso Final: 'Cada vez que alguien agenda una mentoría en el calendario...'. Identifica Trigger, 2 Acciones y el Resultado.",
      expected_answer: "Trigger: Evento de mentoría\nAcciones: Registrar mentoría, Confirmar usuario, Notificar equipo\nResultado: Operación consistente"
    },
    connectionType: 'linear',
    nodes: [
      { id: '1', label: "TRIGGER: Mentoría", type: 'trigger', color: BrandColors.trigger },
      { id: '2', label: "ACCIÓN: Registrar", type: 'action', color: BrandColors.action },
      { id: '3', label: "ACCIÓN: Confirmar", type: 'action', color: BrandColors.action },
      { id: '4', label: "ACCIÓN: Notificar", type: 'action', color: BrandColors.action },
      { id: '5', label: "RESULTADO", type: 'result', color: BrandColors.result }
    ]
  }
];