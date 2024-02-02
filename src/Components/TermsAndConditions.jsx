/* eslint-disable react/no-unescaped-entities */
import { Button, Link, Stack, Typography } from "@mui/material";

function Subtitle({ index, children }) {
  return (
    <Typography fontSize={24} fontWeight={600} color="primary.main" my={2} data-section={index}>
      {index}. {children}
    </Typography>
  );
}

function TermsAndConditions() {
  const goTo = (index) => {
    const element = document.querySelector(`[data-section="${index}"]`);

    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <Stack
      px={4}
      sx={{
        "& ol": {
          counterReset: "item",
        },
        "& li": {
          display: "block",
        },
        "& li:before": {
          content: 'counters(item, ".") ". "',
          counterIncrement: "item",
        },
      }}
    >
      <ol style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
        <Link component={Button} onClick={() => goTo(1)}>
          <li>Definiciones</li>
        </Link>
        <Link component={Button} onClick={() => goTo(2)}>
          <li>Aspectos generales</li>
        </Link>
        <Link component={Button} onClick={() => goTo(3)}>
          <li>Aceptación</li>
        </Link>
        <Link component={Button} onClick={() => goTo(4)}>
          <li>Vinculación</li>
        </Link>
        <Link component={Button} onClick={() => goTo(5)}>
          <li>Declaraciones y garantías</li>
        </Link>
        <Link component={Button} onClick={() => goTo(6)}>
          <li>Transacciones con activos digitales</li>
        </Link>
        <Link component={Button} onClick={() => goTo(7)}>
          <li>Mandato específico</li>
        </Link>
        <Link component={Button} onClick={() => goTo(8)}>
          <li>Uso aceptable</li>
        </Link>
        <Link component={Button} onClick={() => goTo(9)}>
          <li>Cancelación</li>
        </Link>
        <Link component={Button} onClick={() => goTo(10)}>
          <li>Privacidad</li>
        </Link>
        <Link component={Button} onClick={() => goTo(11)}>
          <li>Propiedad intelectual</li>
        </Link>
        <Link component={Button} onClick={() => goTo(12)}>
          <li>Confidencialidad</li>
        </Link>
        <Link component={Button} onClick={() => goTo(13)}>
          <li>Impuestos</li>
        </Link>
        <Link component={Button} onClick={() => goTo(14)}>
          <li>Ausencia de asesoría</li>
        </Link>
        <Link component={Button} onClick={() => goTo(15)}>
          <li>Limitación de responsabilidad</li>
        </Link>
        <Link component={Button} onClick={() => goTo(16)}>
          <li>Información y sitios web de terceros</li>
        </Link>
        <Link component={Button} onClick={() => goTo(17)}>
          <li>Comunicaciones y notificaciones</li>
        </Link>
        <Link component={Button} onClick={() => goTo(18)}>
          <li>Facturación electrónica</li>
        </Link>
        <Link component={Button} onClick={() => goTo(19)}>
          <li>Acuerdo único</li>
        </Link>
        <Link component={Button} onClick={() => goTo(20)}>
          <li>Sucesores y cesionarios</li>
        </Link>
        <Link component={Button} onClick={() => goTo(21)}>
          <li>Divisibilidad</li>
        </Link>
        <Link component={Button} onClick={() => goTo(22)}>
          <li>Renuncia</li>
        </Link>
        <Link component={Button} onClick={() => goTo(23)}>
          <li>Supervivencia</li>
        </Link>
        <Link component={Button} onClick={() => goTo(24)}>
          <li>Ley aplicable</li>
        </Link>
        <Link component={Button} onClick={() => goTo(25)}>
          <li>Procedimientos de resolución de disputas</li>
        </Link>
        <Link component={Button} onClick={() => goTo(26)}>
          <li>Vigencia</li>
        </Link>
        <Link component={Button} onClick={() => goTo(27)}>
          <li>Modificaciones y Actualizaciones de Términos y Condiciones:</li>
        </Link>
        <Link component={Button} onClick={() => goTo(28)}>
          <li>Productos Adicionales:</li>
        </Link>
        <Link component={Button} onClick={() => goTo(29)}>
          <li>Proceso de adquisición</li>
        </Link>
        <Link component={Button} onClick={() => goTo(30)}>
          <li>Obligaciones y responsabilidades de Avovite</li>
        </Link>
        <Link component={Button} onClick={() => goTo(31)}>
          <li>Gestión de la plataforma</li>
        </Link>
        <Link component={Button} onClick={() => goTo(32)}>
          <li>Opciones de recepción de frutos</li>
        </Link>
        <Link component={Button} onClick={() => goTo(33)}>
          <li>Retiros y reembolsos</li>
        </Link>
        <Link component={Button} onClick={() => goTo(34)}>
          <li>Recompensas</li>
        </Link>
        <Link component={Button} onClick={() => goTo(35)}>
          <li>Colaboración con terceros</li>
        </Link>
        <Link component={Button} onClick={() => goTo(36)}>
          <li>Proveedores Tecnológicos y Exención de Responsabilidad</li>
        </Link>
        <Link component={Button} onClick={() => goTo(37)}>
          <li>Disposiciones legales y cumplimiento normativo</li>
        </Link>
      </ol>

      <Subtitle index="1">Definiciones:</Subtitle>
      <p>
        <span>
          <span>
            1.1.1.1.<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
          </span>
        </span>
        Plataforma: Hace referencia a la plataforma digital proporcionada por Avovite, que facilita la adquisición de "vites" y la gestión
        asociada de derechos.
      </p>
      <p>
        <span>
          <span>
            1.1.1.2.<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
          </span>
        </span>
        Vites: adquirir los frutos del cultivo de aguacate y productos complementarios. Al comprometerse con un "vite" mediante un contrato
        de compra de cosa futura, los clientes aseguran una fracción equivalente a la producción de futuras cosechas de un árbol, con
        derechos que pueden extenderse hasta 20 año.
      </p>
      <p>
        <span>
          <span>
            1.1.1.3.<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
          </span>
        </span>
        Usuario: Cualquier individuo o entidad que acceda y utilice la plataforma, ya sea para adquirir "vites" o participar de otras
        funciones ofrecidas.
      </p>
      <p>
        <span>
          <span>
            1.1.1.4.<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
          </span>
        </span>
        Proceso de Adquisición: Incluye todas las fases y pasos relacionados con la compra de "vites" y los derechos vinculados.
      </p>
      <p>
        <span>
          <span>
            1.1.1.5.<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
          </span>
        </span>
        Avovite: Hace referencia a la entidad responsable del cuidado, cultivo y cosecha de árboles y cultivos, así como de gestionar la
        plataforma.
      </p>
      <p>
        <span>
          <span>
            1.1.1.6.<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
          </span>
        </span>
        <strong>Cosechas:</strong> Conjunto de productos agrícolas, principalmente aguacates, que forman parte de la producción resultante
        de los cultivos de Avovite.
      </p>
      <p>
        <span>
          <span>
            1.1.1.7.<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
          </span>
        </span>
        <strong>Comercializadores:</strong> Terceros autorizados que tienen la capacidad de ofertar y comercializar las cosechas de aguacate
        y productos complementarios en nombre de Avovite.
      </p>
      <p>
        <span>
          <span>
            1.1.1.8.<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
          </span>
        </span>
        Duración del Contrato: El periodo de validez del acuerdo de compra de cosa futura, con disposiciones específicas sobre retiro
        anticipado.
      </p>
      <p>
        <span>
          <span>
            1.1.1.9.<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
          </span>
        </span>
        Gestión de la Plataforma: Descripción detallada de la plataforma online, sus actualizaciones, y cómo se llevarán a cabo las
        comunicaciones con los usuarios.
      </p>
      <p>
        <span>
          <span>
            1.1.1.10.<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
          </span>
        </span>
        Transparencia y Reportes: Compromiso de Avovite con la transparencia, proporcionando informes detallados y trazabilidad en todo el
        proceso.
      </p>
      <p>
        <span>
          <span>
            1.1.1.11.<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
          </span>
        </span>
        Opciones de Recepción de Frutos: Indica si los usuarios pueden optar por recibir directamente los frutos o permitir que Avovite
        gestione la venta a través de terceros.
      </p>
      <p>
        <span>
          <span>
            1.1.1.12.<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
          </span>
        </span>
        Participación en Decisiones: Especifica cómo los participantes pueden contribuir en decisiones clave relacionadas con la plataforma.
      </p>
      <Subtitle index="2">Aspectos Generales:</Subtitle>

      <p>2.1 Propósito de la Plataforma:</p>
      <p>
        La plataforma tiene como objetivo principal facilitar la adquisición de "vites" y otros productos agrícolas ofrecidos por Avovite.
        Proporciona a los usuarios un espacio para participar en el proceso de compra, seguimiento de cosechas y otras funciones
        relacionadas.ter
      </p>

      <p>
        <span>
          <span>
            2.2<span>&nbsp;&nbsp;</span>
          </span>
        </span>
        Alcance de los Servicios:
      </p>
      <p>
        Avovite se compromete a ofrecer servicios que abarquen desde la adquisición de "vites" hasta la gestión de cosechas, garantizando a
        los usuarios una experiencia integral en la plataforma.
      </p>
      <p>
        <span>&nbsp;</span>
      </p>

      <p>2.3 Elegibilidad del Usuario:</p>
      <p>
        Para acceder y utilizar la plataforma, los usuarios deben cumplir con los requisitos de elegibilidad establecidos por Avovite. Esto
        puede incluir, entre otros, la capacidad legal para participar en transacciones.
      </p>

      <p>2.4 Registro y Credenciales:</p>
      <p>
        Los usuarios deben completar el proceso de registro proporcionando información precisa y actualizada. Se asignarán credenciales de
        acceso seguras, y los usuarios son responsables de mantener la confidencialidad de sus cuentas.
      </p>

      <p>2.5 Uso Adecuado de la Plataforma:</p>
      <p>
        Se espera que los usuarios utilicen la plataforma de manera ética y respetuosa. Se establecerán prácticas aceptables para garantizar
        un entorno de interacción positivo y seguro.
      </p>

      <p>2.6 Colaboración con Terceros:</p>
      <p>
        En el desarrollo y funcionamiento de la plataforma, Avovite podrá colaborar con terceros para servicios específicos. Los usuarios
        serán informados de estas colaboraciones, y se establecerá la naturaleza de las responsabilidades asociadas.
      </p>

      <p>2.7 Modificaciones y Actualizaciones:</p>
      <p>
        Avovite se reserva el derecho de realizar modificaciones en la plataforma, servicios ofrecidos y términos y condiciones. Los
        usuarios serán notificados de manera oportuna sobre dichas modificaciones.
      </p>

      <p>2.8 Productos Adicionales:</p>
      <p>
        Además de "vites," Avovite podrá ofrecer otros productos agrícolas. Los detalles sobre estos productos adicionales se proporcionarán
        en la plataforma a medida que estén disponibles.
      </p>

      <p>2.9 Pagos:</p>
      <p>Los procedimientos de pago, facturación y la política de retrasos o serán detallados para la comprensión clara de los usuarios.</p>

      <p>
        <span>
          <span>
            2.10<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
          </span>
        </span>
        Recompensas:
      </p>
      <p>
        Se establecerá un programa de recompensas que puede incluir publicidad, cashback y otros tipos de recompensas para los usuarios
        participantes.
      </p>

      <Subtitle index="3">Aceptación:</Subtitle>
      <p>
        <span>
          <span>
            3.1.<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
          </span>
        </span>
        Vinculación Contractual: La aceptación de los términos y condiciones establece una vinculación contractual entre el usuario y
        Avovite. Este contrato rige la relación durante la adquisición de "vites" y otros producto asi como<span>&nbsp;</span>en el uso y la
        participación en otras funciones de la plataforma.
      </p>
      <p>
        <span>
          <span>
            3.2.<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
          </span>
        </span>
        Consentimiento Informado:Los usuarios reconocen haber leído y comprendido de manera completa los términos y condiciones. Avovite
        promoverá la transparencia y proporcionará la información necesaria para un consentimiento informado.
      </p>
      <p>
        <span>
          <span>
            3.3.<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
          </span>
        </span>
        Actualizaciones y Modificaciones: Los usuarios aceptan que los términos y condiciones pueden ser actualizados o modificados por
        Avovite. Se notificará a los usuarios sobre tales cambios, y el uso continuado de la plataforma constituirá la aceptación de las
        modificaciones.
      </p>
      <p>
        <span>
          <span>
            3.4.<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
          </span>
        </span>
        Aceptación de Términos y Al acceder y utilizar la plataforma, los usuarios aceptan plenamente los términos y condiciones
        establecidos por Avovite. La aceptación es requisito fundamental para participar en la adquisición de "vites" y otros productos.
      </p>

      <p>
        <span>
          <span>
            3.5.<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
          </span>
        </span>
        Requisitos Adicionales: Avovite puede establecer requisitos adicionales para la adquisición de "vites" o participación en funciones
        específicas de la plataforma. Estos requisitos serán comunicados de manera clara y oportuna.
      </p>
      <p>
        <span>
          <span>
            3.6.<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
          </span>
        </span>
        Rechazo de Participación: Avovite se reserva el derecho de rechazar la participación de cualquier usuario que no cumpla con los
        términos y condiciones establecidos. 3.7 Revocación del Consentimiento: Los usuarios pueden revocar su consentimiento y dejar de
        utilizar la plataforma en cualquier momento. Sin embargo, esto puede afectar la capacidad del usuario para participar en la
        adquisición de "vites" y otras funciones.
      </p>
      <p>
        <span>
          <span>
            3.<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
          </span>
        </span>
        &nbsp;
      </p>
      <p>
        <span>
          <span>
            3.8<span>&nbsp;&nbsp;</span>
          </span>
        </span>
        Conservación de Documentos: La aceptación de los términos y condiciones implica el consentimiento para la conservación de documentos
        electrónicos que respalden la transacción y la relación contractual.
      </p>
      <Subtitle index="4">Declaraciones y Garantías:</Subtitle>

      <p>4.1 Declaraciones del Usuario:</p>
      <p>
        Al utilizar la plataforma, el usuario declara que toda la información proporcionada es veraz, precisa y completa. Cualquier cambio
        en la información suministrada debe ser comunicado a Avovite de manera inmediata.
      </p>

      <p>4.2 Capacidad Legal:</p>
      <p>
        El usuario declara tener la capacidad legal para participar en la adquisición de "vites" y otras transacciones ofrecidas por
        Avovite. En el caso de representación legal, el representante garantiza tener la autoridad necesaria.
      </p>

      <p>4.3 Conformidad con Normativas:</p>
      <p>
        El usuario se compromete a cumplir con todas las leyes, normativas y disposiciones aplicables durante el uso de la plataforma y en
        la adquisición de "vites" y productos relacionados.
      </p>

      <p>4.4 Uso Adecuado:</p>
      <p>
        El usuario utilizará la plataforma y participará en transacciones de manera ética y legal. Se compromete a no utilizar la plataforma
        con fines ilegales, fraudulentos o inapropiados.
      </p>

      <p>4.5 Información Financiera:</p>
      <p>
        En el caso de transacciones financieras, el usuario garantiza la veracidad y exactitud de la información financiera proporcionada.
        Avovite no asume responsabilidad por información inexacta proporcionada por el usuario.
      </p>

      <p>4.6 Riesgos Asociados:</p>
      <p>
        El usuario reconoce y acepta los riesgos asociados con la adquisición de "vites" y otros productos, incluyendo factores climáticos,
        fluctuaciones de mercado y eventos imprevistos que puedan afectar la producción.
      </p>

      <p>4.7 Garantías de Avovite:</p>
      <p>
        Avovite garantiza el cumplimiento de sus obligaciones conforme a los términos del contrato de adquisición de "vites". Sin embargo,
        no ofrece garantías sobre la rentabilidad de la inversión, que está sujeta a variaciones del mercado y condiciones climáticas.
      </p>

      <p>4.8 Modificaciones en Declaraciones:</p>
      <p>
        Avovite se reserva el derecho de realizar modificaciones en las declaraciones y garantías, notificando a los usuarios sobre tales
        cambios.
      </p>

      <Subtitle index="5">Vinculación:</Subtitle>

      <p>5.1 Aceptación de Términos:</p>
      <p>
        Al acceder y utilizar la plataforma, el usuario acepta vincularse de manera legal con los términos y condiciones establecidos por
        Avovite. La continuación en el uso de la plataforma constituye la aceptación continua de estos términos.
      </p>

      <p>5.2 Vinculación Contractual:</p>
      <p>
        La adquisición de "vites" y la participación en otras transacciones disponibles en la plataforma crea una relación contractual
        vinculante entre el usuario y Avovite, sujeta a los términos establecidos en este documento.
      </p>

      <p>5.3 Responsabilidad de Terceros:</p>
      <p>
        Cualquier tercero, como comercializadores, vinculado a través de la plataforma para la gestión de productos, está sujeto a sus
        propios términos y condiciones. El usuario acepta la responsabilidad de revisar y aceptar dichos términos de terceros.
      </p>

      <p>5.4 Cese de Vinculación:</p>
      <p>
        El usuario puede cesar su vinculación con los términos y condiciones en cualquier momento al dejar de utilizar la plataforma. Sin
        embargo, esto no exime al usuario de las obligaciones derivadas de transacciones previamente aceptadas.
      </p>
      <Subtitle index="6">Transacciones en la adquisición de Vites y otros productos:</Subtitle>
      <p>
        6.1 <strong>Adquisición de "Vites":</strong>
      </p>
      <p>
        El proceso de adquisición de "vites" implica la compra anticipada de frutos y otros productos específicos asociados al cultivo de
        aguacate. Al adquirir un "vite", el usuario está comprometido a recibir la proporción correspondiente de la cosecha de un árbol
        durante el período acordado.
      </p>
      <p>6.2 Modalidades de Transacción:</p>
      <p>
        La plataforma facilita transacciones con activos digitales, principalmente la compra de "vites". Los términos y condiciones
        detallarán los procedimientos, plazos de pago y cualquier otro aspecto relevante para estas transacciones las cuales se euentran en
        el contrato que el usuario “Cliente” se compromete a firmar.
      </p>

      <p>6.3 Responsabilidad de Pago:</p>
      <p>
        Los usuarios asumen la responsabilidad de cumplir con los pagos asociados a la adquisición de "vites" y otros productos disponibles
        en la plataforma. La falta de pago puede resultar en la cancelación del contrato y otras acciones legales según lo establecido en
        este documento.
      </p>

      <p>6.4 Confirmación de Transacciones:</p>
      <p>
        Las transacciones realizadas a través de la plataforma estarán sujetas a confirmación. Avovite se reserva el derecho de rechazar o
        cancelar transacciones en casos de incumplimiento de los términos y condiciones.
      </p>

      <p>6.5 Derechos y Obligaciones de las Partes:</p>
      <p>
        Los derechos y obligaciones tanto de los usuarios como de Avovite en relación con las transacciones con activos digitales estarán
        claramente definidos en los términos y condiciones.{" "}
      </p>
      <Subtitle index="7">Mandato Específico:</Subtitle>

      <p>7.1 Autorización de Manejo:</p>
      <p>
        Al aceptar estos términos y condiciones, los usuarios otorgan a Avovite un mandato específico para gestionar, cosechar y
        comercializar los productos adquiridos a través de la plataforma. Esta autorización se extiende a terceros, como comercializadores,
        en la medida en que sea necesario para cumplir con las obligaciones del contrato.
      </p>

      <p>7.2 Facultades de Terceros:</p>
      <p>
        En situaciones en las que Avovite involucre a terceros, como comercializadores, para llevar a cabo actividades específicas
        relacionadas con el cultivo y comercialización, los usuarios reconocen y aceptan que dichos terceros actuarán en nombre de Avovite y
        estarán sujetos a las disposiciones pertinentes de estos términos y condiciones.
      </p>

      <p>7.3 Límites del Mandato:</p>
      <p>
        El mandato conferido no otorga a Avovite ni a terceros la capacidad de realizar acciones que estén fuera del alcance definido en
        estos términos y condiciones. Los límites y alcances de este mandato específico estarán claramente delineados en el acuerdo.
      </p>

      <Subtitle index="8">Uso Aceptable:</Subtitle>
      <p></p>
      <p>
        8.1 <strong>Prácticas Aceptables:</strong>
        Los usuarios se comprometen a utilizar la plataforma de manera ética y legal. Cualquier uso que viole leyes aplicables, normativas o
        estos términos y condiciones está estrictamente prohibido.
      </p>
      <p>
        8.2 <strong>Restricciones de Uso:</strong>
        Se prohíbe el uso de la plataforma para cualquier fin ilegal, fraudulento o no autorizado. Los usuarios no deben comprometer la
        seguridad de la plataforma ni interferir con su correcto funcionamiento.
      </p>
      <p>
        8.3 <strong>Integridad de la Información:</strong> Los usuarios son responsables de la exactitud y veracidad de la información
        proporcionada durante el proceso de adquisición y en cualquier interacción con la plataforma. Cualquier información falsa o engañosa
        puede resultar en la cancelación del contrato.
      </p>
      <p>
        8.4 <strong>Uso no Comercial:</strong> La plataforma está destinada al uso personal de los usuarios. Cualquier uso comercial de la
        plataforma, sus productos o contenido requiere la autorización expresa de Avovite.
      </p>

      <Subtitle index="9">Cancelación:</Subtitle>
      <p>
        9.1 <strong>Derecho de Cancelación:</strong>
        Los usuarios tienen el derecho de cancelar su participación en el proceso de adquisición antes de haber realizado el pago, La
        cancelación debe realizarse según los procedimientos establecidos por la plataforma.
      </p>
      <p>
        9.2 <strong>Cancelación por Incumplimiento:</strong> Avovite se reserva el derecho de cancelar la participación de un usuario en la
        plataforma si se determina que han violado los términos y condiciones. Esto puede ocurrir en casos de conducta inapropiada,
        fraudulenta o cualquier actividad que ponga en riesgo la integridad de la plataforma.
      </p>
      <p>
        9.3 <strong>Reembolsos y Retiros:</strong>
        En caso específicos de cancelación, los usuarios pueden estar sujetos a políticas de reembolso especificadas en el contrato. Se
        proporcionará información clara sobre el proceso de retiro de fondos o productos asociados.
      </p>
      <Subtitle index="10">Privacidad:</Subtitle>
      <p>
        10.1 <strong>Recopilación de Información:</strong> Avovite recopilará y procesará la información personal de los usuarios de acuerdo
        con su política de privacidad y en conformidad con la Ley de Protección de Datos Personales (Ley 1581 de 2012). Los usuarios deben
        revisar y aceptar esta política para utilizar la plataforma.
      </p>
      <p>
        10.2 <strong>Uso de la Información:</strong>
        La información recopilada se utilizará para facilitar el proceso de adquisición, mejorar la experiencia del usuario y cumplir con
        las obligaciones legales. Avovite se compromete a proteger la privacidad de los usuarios y a no compartir información sin su
        consentimiento.
      </p>
      <p>
        10.3 <strong>Consentimiento del Usuario:</strong> Al utilizar la plataforma, los usuarios otorgan su consentimiento para la
        recopilación, procesamiento y uso de su información personal de acuerdo con los términos establecidos y la legislación aplicable.
      </p>
      <p>
        10.4 <strong>Seguridad de la Información:</strong> Se implementarán medidas de seguridad para proteger la información del usuario.
        Avovite se esforzará por garantizar la confidencialidad e integridad de los datos.
      </p>
      <p>
        10.5 <strong>Derechos del Usuario:</strong>
        Los usuarios tendrán derechos sobre su información personal, incluido el acceso, rectificación y eliminación de datos. Estos
        derechos se detallarán en la política de privacidad.
      </p>
      <p>
        10.6 <strong>Uso Comercial y Otros Productos:</strong> Al aceptar estos términos y condiciones, los usuarios consienten el uso de su
        información personal con fines comerciales por parte de Avovite y la posibilidad de recibir ofertas y comunicaciones sobre otros
        productos o servicios ofrecidos por la plataforma, la empresa y/o empresas vinculadas.
      </p>
      <Subtitle index="11">Propiedad Intelectual:</Subtitle>
      <p>
        11.1 <strong>Derechos de Propiedad:</strong>
        Todo el contenido, diseño, marcas registradas, y propiedad intelectual asociada a la plataforma son propiedad exclusiva de Avovite.
        Los usuarios reconocen y respetan estos derechos y se comprometen a no copiar, reproducir ni utilizar dicho contenido de manera no
        autorizada.
      </p>
      <p>
        11.2 <strong>Licencia de Uso:</strong>
        Avovite otorga a los usuarios una licencia limitada, no exclusiva e intransferible para utilizar la plataforma con fines personales
        y no comerciales. Esta licencia no implica la transferencia de derechos de propiedad.
      </p>
      <p>
        11.3 <strong>Uso Aceptable:</strong> Los usuarios se comprometen a utilizar la plataforma de manera ética y legal, respetando los
        derechos de propiedad intelectual de Avovite y de terceros. Cualquier uso no autorizado puede resultar en la cancelación de la
        cuenta y acciones legales.
      </p>
      <p>
        11.4 <strong>Denuncias de Infracción:</strong>
        Avovite responderá diligentemente a las denuncias de infracción de derechos de propiedad intelectual. Los usuarios que consideren
        que su contenido ha sido utilizado de manera inapropiada pueden realizar peticiones mediante el servicio al cliente.
      </p>
      <Subtitle index="12">Confidencialidad:</Subtitle>
      <p>
        12.1 <strong>Información Confidencial:</strong> Los usuarios reconocen que, durante el uso de la plataforma, pueden tener acceso a
        información confidencial de Avovite, incluyendo, pero no limitándose a, detalles operativos, estrategias comerciales, datos
        financieros, tecnologías, acuerdos con terceros (como empresas comercializadoras, aliados, proveedores, etc.) y cualquier
        información marcada expresamente como confidencial. Se comprometen a no divulgar, reproducir o utilizar dicha información para fines
        ajenos al acuerdo establecido.
      </p>
      <p>
        12.2 <strong>Alcance de la Confidencialidad:</strong> La obligación de confidencialidad abarca, pero no se limita a, la información
        mencionada en el punto 12.1.
      </p>
      <p>
        12.3 <strong>Excepciones:</strong> La obligación de confidencialidad no se aplica a información que sea de conocimiento público, que
        el usuario ya poseía antes de acceder a la plataforma, o que sea revelada conforme a requisitos legales.
      </p>
      <p>
        12.4 <strong>Duración de la Confidencialidad:</strong> La obligación de confidencialidad persistirá incluso después de la
        terminación del contrato entre el usuario y Avovite.
      </p>
      <Subtitle index="13">Impuestos:</Subtitle>
      <p>
        13.1 <strong>Responsabilidad del Usuario:</strong> Los usuarios son responsables de cumplir con todas las obligaciones fiscales
        derivadas de las transacciones realizadas a través de la plataforma. Esto incluye, pero no se limita a, impuestos sobre ingresos,
        ventas u otros impuestos similares.
      </p>
      <p>
        13.2 <strong>Información y Asesoramiento Fiscal:</strong> Avovite no proporciona asesoramiento fiscal. Se recomienda a los usuarios
        buscar asesoramiento profesional independiente sobre cuestiones fiscales relacionadas con sus transacciones en la plataforma.
      </p>
      <p>
        13.3 <strong>Registro y Reporte:</strong>
        Los usuarios deben cumplir con los requisitos de registro y reporte establecidos por las autoridades fiscales correspondientes en su
        jurisdicción.
      </p>
      <p>
        13.4 <strong>Modificaciones Legales:</strong>
        Avovite se reserva el derecho de realizar cambios en las políticas fiscales de la plataforma en respuesta a modificaciones en la
        legislación fiscal aplicable.
      </p>
      <Subtitle index="14">Ausencia de Asesoría:</Subtitle>
      <p>
        14.1 <strong>Asesoramiento Independiente:</strong> Los usuarios reconocen que Avovite no proporciona asesoramiento financiero, legal
        ni de otro tipo. Se recomienda a los usuarios buscar asesoramiento independiente antes de tomar decisiones basadas en la información
        proporcionada por la plataforma.
      </p>
      <p>
        14.2 <strong>Riesgos y Decisiones:</strong>
        Los usuarios asumen la responsabilidad de evaluar los riesgos asociados con las transacciones y decisiones tomadas en la plataforma.
        Avovite no garantiza resultados específicos y no es responsable de las consecuencias derivadas de las decisiones de los usuarios.
      </p>
      <p>
        14.3 <strong>Información Informativa:</strong>
        Cualquier información proporcionada por Avovite, ya sea en la plataforma, documentos relacionados o comunicaciones, se presenta con
        fines informativos y no constituye asesoramiento profesional.
      </p>
      <Subtitle index="15">Limitación de responsabilidad:</Subtitle>
      <p>
        15.1 <strong>Responsabilidad General:</strong>
        Avovite no será responsable de pérdidas directas, indirectas, incidentales, consecuentes u otras que puedan surgir en relación con
        el uso de la plataforma, la adquisición de "vites" o cualquier actividad relacionada.
      </p>
      <p>
        <strong>15.2 Riesgos Agrícolas:</strong>
        Los usuarios comprenden y aceptan los riesgos inherentes a la agricultura, incluidos eventos climáticos, plagas y enfermedades. En
        caso de pérdidas cubiertas por pólizas de seguros vigentes, Avovite se compromete a gestionar las reclamaciones de manera oportuna y
        utilizar los fondos recuperados para reactivar el cultivo o los cultivos complementarios, en su defecto como indenisación de las
        compras realizadas por los usuarios. La decisión sobre la utilización de los fondos estará sujeta a la discreción de Avovite y se
        llevará a cabo de manera transparente, comunicando adecuadamente a los usuarios. 15.3 <strong>
          Interrupciones de Servicio:
        </strong>{" "}
        Avovite no garantiza la disponibilidad ininterrumpida de la plataforma y no será responsable de interrupciones temporales debido a
        mantenimiento, actualizaciones u otras razones.
      </p>
      <p>
        15.4 <strong>Decisión de compra:</strong>
        La decisión de adquirir "vites"o cualquier otro producto es voluntaria y a discreción del usuario. Avovite no será responsable de
        las decisiones de compra tomadas por los usuarios.
      </p>
      <Subtitle index="16">Información y Sitios Web de Terceros:</Subtitle>
      <p>
        Avovite puede proporcionar enlaces a sitios web de terceros u otras fuentes de información. Los usuarios reconocen que estos enlaces
        se proporcionan solo con fines informativos y conveniencia. Avovite no respalda, controla ni garantiza la precisión, integridad,
        relevancia o actualidad de la información disponible en estos sitios web de terceros. Al acceder a dichos enlaces, los usuarios
        asumen la responsabilidad de evaluar la información y aceptan que Avovite no será responsable de pérdidas o daños derivados del uso
        de dicha información.
      </p>
      <Subtitle index="17">Comunicaciones:</Subtitle>
      <p>
        Las comunicaciones entre Avovite y los usuarios se llevarán a cabo a través de los canales de contacto proporcionados por los
        usuarios durante el proceso de registro, incluyendo número de teléfono y correo electrónico. Los usuarios aceptan recibir
        comunicaciones electrónicas, mensajes y notificaciones relacionadas con la plataforma, los "vites" adquiridos, cosechas y otros
        productos ofrecidos por Avovite. Es responsabilidad del usuario mantener actualizada su información de contacto. Avovite no se hace
        responsable de las consecuencias derivadas de la falta de recepción de comunicaciones debido a información desactualizada.
      </p>
      <Subtitle index="18">Facturación Electrónica:</Subtitle>
      <p>
        Los usuarios aceptan y autorizan la emisión de facturas electrónicas por parte de Avovite, las cuales se enviarán a la dirección de
        correo electrónico proporcionada durante el proceso de registro. Es responsabilidad del usuario asegurarse de que la información de
        contacto y facturación sea precisa y esté actualizada. Avovite se reserva el derecho de utilizar medios electrónicos para la
        facturación y documentación asociada, promoviendo así prácticas sostenibles y amigables con el medio ambiente.
      </p>
      <Subtitle index="19">Acuerdo Complementario:</Subtitle>
      <p>
        Estos términos y condiciones complementan cualquier acuerdo previo existente entre los usuarios y Avovite. En caso de cualquier
        discrepancia entre este acuerdo y acuerdos previos, se dará prioridad a la información contenida en ambos documentos en la medida
        que no entren en conflicto, y cualquier discrepancia significativa será notificada a los usuarios de manera oportuna, en caso de que
        tal de que eexista diferencias en la interpretación se utilizara la conciliación y la buena fé de las partes para remediar las
        discrepencias.
      </p>
      <Subtitle index="20">Sucesores y Cesionarios:</Subtitle>
      <p>
        Avovite se reserva el derecho de ceder total o parcialmente los derechos y obligaciones derivados de estos términos y condiciones a
        un tercero, ya sea en el contexto de una fusión, adquisición o cualquier otro cambio en la estructura corporativa. En caso de que
        dicha cesión ocurra, los usuarios aceptan que el beneficiario de esta cesión asumirá todas las obligaciones y responsabilidades
        establecidas en estos términos y condiciones. Del mismo modo, los usuarios tienen el derecho de designar beneficiarios en sus
        contratos individuales, y en caso de fallecimiento, los derechos y beneficios se transferirán conforme a las disposiciones
        establecidas en dichos contratos.
      </p>
      <Subtitle index="21">Divisibilidad:</Subtitle>
      <p>
        Si alguna disposición de estos términos y condiciones se considera inválida, ilegal o inaplicable en cualquier jurisdicción, dicha
        disposición no afectará la validez, legalidad o aplicabilidad de las demás disposiciones en esa jurisdicción, ni afectará la
        validez, legalidad o aplicabilidad de dicha disposición en cualquier otra jurisdicción. Las partes se esforzarán por reemplazar
        cualquier disposición inválida, ilegal o inaplicable por una disposición válida, legal y aplicable que se acerque lo más posible a
        la intención original de las partes.
      </p>
      <Subtitle index="22">Renuncia:</Subtitle>
      <p>
        La falta de ejercicio por parte de Avovite de cualquier derecho o disposición de estos términos y condiciones no constituirá una
        renuncia a dicho derecho o disposición, a menos que Avovite así lo reconozca y acuerde por escrito. Cualquier renuncia a cualquier
        incumplimiento o incumplimiento anticipado de estos términos y condiciones no constituirá una renuncia a cualquier incumplimiento
        subsiguiente o similar. Además, la renuncia por parte de Avovite de cualquier término, condición o disposición de estos términos y
        condiciones será efectiva solo si se realiza por escrito y está firmada por un representante autorizado de Avovite.
      </p>
      <Subtitle index="23">Supervivencia:</Subtitle>
      <p>
        Las disposiciones y términos que, por su naturaleza, deban sobrevivir a la terminación o expiración de estos términos y condiciones,
        permanecerán en pleno vigor y efecto, incluidos, entre otros, los apartados de Confidencialidad, Limitación de Responsabilidad,
        Propiedad Intelectual, Ley Aplicable y Solución de Controversias.
      </p>
      <Subtitle index="24">Ley Aplicable:</Subtitle>
      <p>
        Estos términos y condiciones se regirán e interpretarán de acuerdo con las leyes del Colombia, excluyendo cualquier conflicto de
        principios legales. Cualquier acción legal o procedimiento relacionado con estos términos se llevará a cabo exclusivamente en los
        tribunales Colombia y las partes consienten en la jurisdicción exclusiva de dichos tribunales.
      </p>
      <Subtitle index="25">Solución de Controversias:</Subtitle>
      <p>
        Cualquier controversia, desacuerdo o reclamación resultante de o en relación con estos términos y condiciones, incluyendo su
        existencia, validez, interpretación, cumplimiento o incumplimiento, será sometida a la Justicia ordinaria colombiana.
      </p>
      <Subtitle index="26">Vigencia:</Subtitle>
      <p>
        Estos términos y condiciones entrarán en vigencia a partir de la fecha de aceptación por parte del usuario y permanecerán en efecto
        hasta su modificación o terminación por cualquiera de las partes. Avovite se reserva el derecho de modificar estos términos y
        condiciones en cualquier momento, notificando a los usuarios de dichos cambios con anticipación.
      </p>
      <Subtitle index="27">Modificaciones y Actualizaciones de Términos y Condiciones:</Subtitle>
      <p>
        Avovite se reserva el derecho de realizar modificaciones y actualizaciones a estos términos y condiciones en cualquier momento.
        Dichas modificaciones entrarán en vigencia a partir de su publicación en la plataforma. Se notificará a los usuarios sobre cambios
        significativos con anticipación. El uso continuado de la plataforma después de la entrada en vigencia de dichas modificaciones
        constituirá la aceptación de los nuevos términos y condiciones por parte de los usuarios.
      </p>
      <Subtitle index="28">Productos Adicionales:</Subtitle>
      <p>
        Avovite se reserva la posibilidad de ofrecer productos adicionales a través de la plataforma. Estos productos pueden variar y ser
        introducidos en cualquier momento. La información detallada sobre estos productos adicionales, incluyendo descripciones, precios y
        condiciones de adquisición, se proporcionará en la plataforma y estará sujeta a estos términos y condiciones. Y <span>&nbsp;</span>
        se regirán por las leyes aplicables al comercio electrónico en Colombia.
      </p>
      <Subtitle index="29">Proceso de Adquisición:</Subtitle>
      <p>
        Los usuarios pueden adquirir "vites" y cualquier otro prodcutoa través de la plataforma siguiendo el proceso detallado de compra.
        Este proceso incluirá la selección de la cantidad deseada de "vites" y la confirmación de la transacción. Avovite se compromete a
        proporcionar una descripción clara y detallada de este proceso, así como a brindar asistencia en caso de preguntas o inconvenientes
        durante la adquisición.
      </p>
      <Subtitle index="30">Obligaciones y responsabilidades de Avovite:</Subtitle>
      <p>Asume las siguientes responsabilidades en el marco del contrato de adquisición de "vites" y otros productos:</p>
      <p>
        30.1. Cuidado, Cultivo y Cosecha: Avovite se compromete a cuidar, cultivar y cosechar los árboles, cultivos y productos asociados de
        manera diligente y profesional, asegurando la calidad y cantidad esperadas.
      </p>
      <p>
        30.2. Duración del Contrato: Avovite garantiza el cumplimiento de las condiciones establecidas en el contrato de compra de cosa
        futura durante toda su duración. En caso de retiro anticipado, se aplicarán las disposiciones acordadas.
      </p>
      <p>
        30.3. Gestión de la Plataforma: Avovite gestionará la plataforma online de manera eficiente, asegurando su funcionamiento óptimo,
        implementando actualizaciones necesarias y comunicándose de manera transparente con los usuarios.
      </p>
      <p>
        30.4. Transparencia y Reportes: Avovite se compromete a mantener altos estándares de transparencia, proporcionando informes
        detallados sobre el proceso de cultivo, cosecha y distribución de productos. Estos informes serán accesibles a los usuarios.
      </p>
      <p>
        30.5. <strong>Opciones de Recepción de Frutos:</strong>
        Avovite permitirá a los usuarios elegir entre recibir directamente los frutos o autorizar la gestión de ventas a través de terceros,
        como comercializadores. Se brindará información clara sobre ambas opciones.
      </p>
      <Subtitle index="31">Gestión de la Plataforma:</Subtitle>
      <p>
        Este apartado detalla la administración, operación y evolución de la plataforma online de Avovite, proporcionando información
        crucial sobre su funcionamiento y las responsabilidades asociadas.
      </p>
      <p>
        31.1. <strong>Descripción de la Plataforma:</strong>
        Se brinda una descripción detallada de la plataforma online de Avovite, incluyendo sus características, funcionalidades y servicios
        ofrecidos. Esto garantiza que los usuarios comprendan completamente el entorno en el que participan.
      </p>
      <p>
        <strong>31.1. Descripción de la Plataforma:</strong>
      </p>
      <p>
        Esta sección proporciona una descripción detallada de la plataforma online de Avovite, abarcando sus características,
        funcionalidades y servicios ofrecidos. Con el objetivo de brindar una comprensión completa a los usuarios, se detallan las distintas
        secciones y herramientas disponibles en la plataforma:
      </p>
      <p>
        31.1.1. <strong>Compra de "Vites":</strong> - Explicación detallada del proceso de adquisición de "vites" y los derechos asociados.
        - Información sobre cómo los usuarios pueden participar en el proceso de compra y las consideraciones clave.
      </p>
      <p>
        31.1.2. <strong>Dashboard:</strong> - Descripción de la interfaz de usuario principal que proporciona un resumen visual de la
        actividad y los datos relevantes. - Funcionalidades específicas incluidas en el dashboard para facilitar la navegación y el acceso
        rápido a información crucial.
      </p>
      <p>
        31.1.3. <strong>"Vites":</strong> - Detalles sobre la sección dedicada a la gestión y visualización de los "vites" adquiridos por
        los usuarios. - Funciones específicas relacionadas con la administración y seguimiento de la participación en futuras cosechas.
      </p>
      <p>
        31.1.4. <strong>Cosechas:</strong> - Explicación de cómo los usuarios pueden acceder a información detallada sobre las cosechas,
        incluyendo fechas previstas de cosecha, rendimientos estimados, y otros detalles relevantes.
      </p>
      <p>
        31.1.5. <strong>Transacciones:</strong> - Descripción de la sección que registra todas las transacciones realizadas, proporcionando
        a los usuarios un historial claro de sus actividades.
      </p>
      <p>
        31.1.6. <strong>Pagos:</strong> - Información detallada sobre los procedimientos de pago, facturación y la política en caso de
        retrasos o incumplimientos.
      </p>
      <p>
        31.1.7. <strong>Perfil:</strong> - Sección dedicada a la gestión del perfil del usuario, incluyendo opciones de privacidad,
        configuraciones de notificación y otros detalles personales.
      </p>
      <p>
        31.2. <strong>Actualizaciones y Mejoras:</strong>
        Avovite se reserva el derecho de realizar actualizaciones y mejoras en la plataforma para garantizar su eficiencia y seguridad. Los
        usuarios serán notificados con anticipación sobre cualquier cambio significativo.
      </p>
      <p>
        31.3. <strong>Comunicaciones con los Usuarios:</strong>
        Se establece cómo se llevarán a cabo las comunicaciones entre Avovite y los usuarios, ya sea a través de la plataforma, correos
        electrónicos u otros medios. La transparencia en la comunicación es esencial para mantener informados a los usuarios.
      </p>
      <p>
        31.4. <strong>Soporte Técnico:</strong> En caso de problemas técnicos o consultas, se proporcionará información sobre cómo acceder
        al soporte técnico de la plataforma. Esto asegura que los usuarios cuenten con la asistencia necesaria durante su interacción con
        Avovite.
      </p>
      <p>
        31.5. <strong>Seguridad de la Plataforma:</strong>
        Avovite se compromete a implementar medidas de seguridad para proteger la información de los usuarios. Esto abarca desde la
        privacidad de datos hasta la seguridad financiera en transacciones realizadas a través de la plataforma.
      </p>
      <p>
        31.6. <strong>Suspensión Temporal:</strong> En situaciones excepcionales, Avovite se reserva el derecho de suspender temporalmente
        el acceso a la plataforma. Se especificarán las circunstancias que podrían llevar a esta suspensión y los procedimientos para su
        levantamiento.
      </p>
      <p>
        31.7. <strong>Finalización de la Plataforma:</strong>
        En caso de que Avovite decida dar por terminada la operación de la plataforma, se notificará a los usuarios con anticipación,
        brindando orientación sobre los pasos a seguir y la gestión de sus derechos adquiridos.
      </p>

      <Subtitle index="32">Opciones de Recepción de Frutos:</Subtitle>

      <p>
        Esta sección detalla las opciones disponibles para los usuarios en cuanto a la recepción de los frutos. Brinda claridad sobre las
        elecciones que los usuarios pueden hacer en relación con la gestión de los productos obtenidos.
      </p>
      <p>
        32.1. <strong>Recepción Directa por Parte del Usuario:</strong> Los usuarios tendrán la opción de recibir directamente los frutos y
        productos de sus adquisiciones. Se especificarán los procedimientos logísticos, plazos y cualquier requisito relacionado con esta
        opción.
      </p>
      <p>
        32.2. <strong>Gestión de Venta por Avovite a Terceros:</strong> Avovite puede ofrecer la posibilidad de gestionar la venta de los
        frutos a través de terceros, como comercializadores u otros socios. En este caso, se proporcionará información detallada sobre cómo
        se llevará a cabo este proceso y cómo se distribuirán las ganancias.
      </p>
      <p>
        32.3. <strong>Roles y Responsabilidades en la Logística:</strong> Para cada opción, se describirán claramente los roles y
        responsabilidades tanto de Avovite como de los usuarios. Esto incluirá aspectos logísticos, costos asociados y cualquier otro
        elemento relevante para una gestión eficiente.
      </p>
      <p>
        32.4. <strong>Flexibilidad en la Elección:</strong>
        Los usuarios pueden tener la flexibilidad de cambiar su elección en cuanto a la recepción de los frutos, siempre y cuando se cumplan
        ciertos requisitos y condiciones que se establecerán en esta sección.
      </p>
      <p>
        32.5. <strong>Comunicación de Elecciones:</strong>
        Procedimientos claros sobre cómo los usuarios deben comunicar sus elecciones, ya sea la recepción directa o la gestión de ventas por
        parte de Avovite, para garantizar una coordinación efectiva.
      </p>
      <p>
        32.6. <strong>Impacto en Beneficios y Recompensas:</strong> En caso de que las elecciones de los usuarios tengan un impacto en
        beneficios o recompensas, esta sección proporcionará detalles sobre cómo se manejarán estos aspectos y cómo se reflejarán en las
        transacciones y reportes.
      </p>

      <Subtitle index="33">Retiros de la Venta de Cosechas y Otros Pagos:</Subtitle>
      <p>
        Esta sección establece los procedimientos y condiciones para la gestión de retiros de las ganancias generadas por la venta de
        cosechas y otros productos adquiridos a través de la plataforma. Para garantizar eficiencia y transparencia, se han establecido las
        siguientes pautas:
      </p>
      <p>
        <strong>33.1. Proceso de Retiro Automático: </strong>Los retiros se procesarán automáticamente, garantizando una rápida
        disponibilidad de los fondos en la cuenta designada por el usuario. Este método acelera el acceso a las ganancias sin intervención
        manual.
      </p>
      <p>
        33.2. Retiros Manuales: En casos excepcionales que requieran intervención manual, la empresa se compromete a completar el proceso de
        retiro en un plazo máximo de 7 días hábiles a partir de la solicitud del usuario.
      </p>
      <p>
        <strong>33.3. Método de Pago</strong>: Los retiros se realizarán mediante transferencia a la cuenta bancaria proporcionada por el
        usuario. Avovite garantiza la seguridad y confidencialidad de estos procesos financieros.
      </p>
      <p>
        <strong>33.4. Pagos Masivos: </strong>La empresa se reserva el derecho de realizar pagos masivos a través de una pasarela de pagos
        cuando sea necesario. Esta opción se implementará para facilitar transacciones eficientes y seguras en situaciones específicas.
      </p>
      <p>
        <strong>33.5. Notificaciones Automáticas: </strong>Los usuarios recibirán notificaciones automáticas sobre el estado de sus
        solicitudes de retiro. Estas notificaciones incluirán confirmaciones de procesamiento automático, aprobaciones manuales y cualquier
        información relevante para el usuario.
      </p>
      <p>
        <strong>33.6. Implicaciones Fiscales: </strong>Se proporcionará información básica sobre las implicaciones fiscales relacionadas con
        los retiros. Sin embargo, se recomienda a los usuarios buscar asesoramiento profesional para comprender completamente sus
        responsabilidades tributarias.
      </p>
      <Subtitle index="34">Recompensas:</Subtitle>
      <p>
        En esta sección se detallan las condiciones y funcionamiento del programa de recompensas ofrecido por Avovite. El programa tiene
        como objetivo incentivar la participación activa de los usuarios y fomentar el crecimiento de la comunidad. A continuación, se
        presentan los aspectos clave de este programa:
      </p>
      <p>
        34.1. <strong>Descripción del Programa:</strong>
        Avovite ofrece un programa de recompensas que puede incluir, entre otros, beneficios económicos y no economicos por publicidad,
        cashback y otras formas de incentivos. La participación en este programa es voluntaria y está sujeta a los términos y condiciones
        establecidos en esta sección.
      </p>
      <p>
        34.2. <strong>Mecanismos de Obtención de Recompensas:</strong> Se detallan los diferentes métodos mediante los cuales los usuarios
        pueden obtener recompensas. Esto puede incluir, pero no se limita a, referir nuevos usuarios, participar en eventos específicos, o
        alcanzar ciertos hitos dentro de la plataforma.
      </p>
      <p>
        34.3. <strong>Condiciones de Canje:</strong> Avovite establece condiciones claras sobre cómo los usuarios pueden canjear sus
        recompensas. Esto puede incluir requisitos mínimos, plazos para el canje y cualquier restricción relevante.
      </p>
      <p>
        34.4. <strong>Vigencia de las Recompensas:</strong>
        Se indica la duración de la validez de las recompensas, asegurando que los usuarios estén informados sobre el período durante el
        cual pueden aprovechar sus beneficios.
      </p>
      <p>
        34.5. <strong>Modificaciones en el Programa:</strong>
        Avovite se reserva el derecho de realizar modificaciones en el programa de recompensas. Cualquier cambio será notificado a los
        usuarios de manera anticipada, y se proporcionarán detalles claros sobre cómo afectará a las recompensas acumuladas.
      </p>
      <p>
        34.6. <strong>Responsabilidad del Usuario:</strong>
        Los usuarios son responsables de seguir las reglas establecidas en esta sección para participar en el programa de recompensas. El
        incumplimiento de estas reglas puede resultar en la pérdida de beneficios o la suspensión del acceso al programa.
      </p>

      <Subtitle index="35">Colaboración con Terceros:</Subtitle>

      <p>
        Esta sección detalla la naturaleza de las colaboraciones de Avovite con terceros para la provisión de servicios específicos dentro
        de la plataforma. La colaboración con terceros puede abarcar diversas áreas y servicios, y se establecen las siguientes
        disposiciones:
      </p>
      <p>
        35.1. <strong>Descripción de Colaboraciones:</strong>
        Se proporciona una descripción clara de las colaboraciones existentes o futuras con terceros. Esto puede incluir, pero no limitarse
        a, empresas comercializadoras, aliados estratégicos, proveedores de servicios, entre otros.
      </p>
      <p>
        35.2. <strong>Responsabilidades de Terceros:</strong>
        Se especifican las responsabilidades y roles de los terceros con los que Avovite colabora. Esto garantiza que los usuarios tengan
        claridad sobre quiénes son los involucrados en la prestación de servicios adicionales y qué funciones desempeñan.
      </p>
      <p>
        35.3. <strong>Gestión de Datos Compartidos:</strong>
        En caso de compartir datos con terceros en el contexto de las colaboraciones, se establecen medidas claras para garantizar la
        privacidad y seguridad de la información. Esto está alineado con la Ley de Protección de Datos Personales o Ley 1581 de 2012.
      </p>
      <p>
        35.4. <strong>Condiciones de Colaboración:</strong>
        Se detallan las condiciones bajo las cuales se lleva a cabo la colaboración con terceros, incluyendo cualquier término contractual
        relevante.
      </p>
      <p>
        35.5. <strong>Revisión y Actualización de Colaboraciones:</strong> Avovite se compromete a revisar y, si es necesario, actualizar
        las colaboraciones con terceros de manera periódica. Cualquier cambio significativo será comunicado a los usuarios de forma
        transparente.
      </p>
      <p>
        35.6. <strong>Limitación de Responsabilidad:</strong>
        Avovite establece claramente que la responsabilidad en las colaboraciones con terceros está limitada a lo acordado en los términos y
        condiciones. Los usuarios comprenden y aceptan que las transacciones o interacciones con terceros están regidas por las políticas de
        esos terceros.
      </p>
      <p>
        Esta sección tiene como objetivo proporcionar transparencia sobre las colaboraciones de Avovite con terceros, asegurando que los
        usuarios estén informados sobre las relaciones externas que pueden afectar su experiencia en la plataforma.
      </p>

      <Subtitle index="36">Proveedores Tecnológicos y Exención de Responsabilidad:</Subtitle>

      <p>
        36.1. <strong>Proveedores Tecnológicos:</strong>
        Avovite reconoce que la plataforma puede depender de servicios y tecnologías proporcionadas por terceros, denominados proveedores
        tecnológicos. Estos proveedores pueden incluir, pero no limitarse a, servicios de alojamiento web, servicios de seguridad
        informática, pasarelas de pago y otros componentes tecnológicos.
      </p>
      <p>
        36.2. <strong>Exención de Responsabilidad de Proveedores Tecnológicos:</strong> Los usuarios comprenden y aceptan que Avovite no
        asume responsabilidad directa por cualquier falla, interrupción o problema técnico causado por los proveedores tecnológicos. En caso
        de eventos fuera del control directo de Avovite, como fallas en servidores de terceros, problemas de red o interrupciones en
        servicios externos, Avovite se exime de responsabilidad.
      </p>
      <p>
        36.3. <strong>Continuidad del Servicio:</strong>
        Aunque Avovite se compromete a tomar medidas razonables para garantizar la continuidad del servicio, los usuarios reconocen que
        eventos imprevistos o fuera del control directo de Avovite pueden afectar la disponibilidad de la plataforma. En tales casos,
        Avovite buscará soluciones y comunicará cualquier interrupción significativa.
      </p>
      <p>
        36.4. <strong>Respaldo y Recuperación de Datos:</strong>
        Avovite implementará medidas de respaldo y recuperación de datos según considere apropiado. Sin embargo, los usuarios son
        conscientes de que la pérdida de datos debido a fallas de proveedores tecnológicos puede estar fuera del control directo de Avovite.
      </p>
      <p>
        36.5. <strong>Actualizaciones y Mejoras:</strong>
        Avovite se reserva el derecho de realizar actualizaciones y mejoras en la plataforma, incluso si estas implican cambios en los
        proveedores tecnológicos. Los usuarios aceptan que estas actualizaciones son necesarias para mantener la funcionalidad y seguridad
        de la plataforma.
      </p>
      <p>
        36.6. <strong>Cooperación en Problemas Técnicos:</strong>
        En caso de problemas técnicos relacionados con proveedores tecnológicos, Avovite se compromete a cooperar y facilitar la resolución
        de problemas en la medida de lo posible. Sin embargo, la resolución final puede depender de las políticas y acciones de los
        proveedores tecnológicos involucrados.
      </p>

      <Subtitle index="37">Disposiciones Legales y Cumplimiento Normativo:</Subtitle>

      <p>
        37.1. <strong>Marco Legal Aplicable:</strong> Los usuarios reconocen y aceptan que la plataforma Avovite está sujeta a las leyes y
        regulaciones colombianas aplicables. Avovite se compromete a operar de acuerdo con la legislación vigente, incluyendo, pero no
        limitándose a, disposiciones relacionadas con contratos, comercio electrónico, protección de datos personales y otras normativas
        aplicables.
      </p>
      <p>
        37.2. <strong>Ley de Protección de Datos Personales:</strong> Avovite se compromete a cumplir con la Ley de Protección de Datos
        Personales (Ley 1581 de 2012) y normativas relacionadas. Los usuarios aceptan que, al proporcionar información personal, están dando
        su consentimiento para el tratamiento de dicha información de acuerdo con la política de privacidad de Avovite.
      </p>
      <p>
        37.3. <strong>Derechos del Consumidor:</strong> En concordancia con las leyes colombianas de protección al consumidor, Avovite
        reconoce y respeta los derechos de los usuarios. Se establecen mecanismos para resolver reclamaciones y disputas de manera justa y
        transparente, de conformidad con las normativas pertinentes.
      </p>
      <p>
        37.4. <strong>SAGRILAFT y KYC:</strong> Avovite implementará procedimientos de SAGRILAFT (Sistema de Gestión y Análisis del Riesgo
        de Lavado de Activos y Financiación del Terrorismo) y KYC (Conozca a su Cliente) para verificar la identidad de los usuarios y
        cumplir con las regulaciones en materia de prevención del lavado de activos y financiación del terrorismo. Los usuarios que no
        cumplan con los requisitos establecidos podrán ser reportados y/o sujetos a cancelación de su cuenta.
      </p>
      <p>
        37.5. <strong>Modificaciones Legales:</strong> En caso de cambios en la legislación colombiana que afecten directamente los términos
        y condiciones de uso de la plataforma, Avovite se reserva el derecho de realizar ajustes correspondientes. Los usuarios serán
        notificados de cualquier modificación en cumplimiento con los procesos establecidos en estos términos y condiciones.
      </p>
      <p>
        37.6. <strong>Cumplimiento Normativo:</strong>
        Avovite se compromete a cumplir con todas las regulaciones y requisitos normativos aplicables a su operación. Esto incluye, entre
        otros, el cumplimiento de obligaciones fiscales, normas comerciales y requisitos de divulgación.
      </p>
      <p>
        37.7. <strong>Cooperación con Autoridades Competentes:</strong> En situaciones que lo requieran, Avovite cooperará con las
        autoridades competentes para garantizar el cumplimiento de la ley. Esto puede incluir la divulgación de información pertinente según
        las solicitudes legales y procesos judiciales.
      </p>
      <p>
        Esta sección tiene como objetivo establecer la adhesión de Avovite a las leyes y regulaciones colombianas aplicables, así como
        garantizar la transparencia y protección de los derechos de los usuarios en el marco legal.
      </p>
    </Stack>
  );
}

export default TermsAndConditions;
