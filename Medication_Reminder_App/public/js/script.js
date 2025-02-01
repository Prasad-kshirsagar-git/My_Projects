document.addEventListener("DOMContentLoaded", () => {
  // Delete Medicine
  document.querySelectorAll(".delete-btn").forEach((button) => {
    button.addEventListener("click", async (event) => {
      const medicineCard = event.target.closest(".medicine-card");
      const medicineId = medicineCard.dataset.id;

      try {
        const response = await fetch(`/medicine/delete/${medicineId}`, {
          method: "DELETE",
        });
        if (response.ok) {
          alert("Medicine deleted successfully!");
          medicineCard.remove(); // Remove the card from the UI
        } else {
          alert("Failed to delete medicine.");
        }
      } catch (error) {
        console.error("Error deleting medicine:", error);
      }
    });
  });

  // Set Alarm
  document.querySelectorAll(".alarm-btn").forEach((button) => {
    button.addEventListener("click", async (event) => {
      const medicineCard = event.target.closest(".medicine-card");
      const medicineId = medicineCard.dataset.id;
      const scheduleTime = medicineCard.dataset.time;

      try {
        const response = await fetch(`/medicine/alarm/${medicineId}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ scheduleTime }),
        });
        if (response.ok) {
          alert("Alarm set and text message sent!");
        } else {
          alert("Failed to set alarm.");
        }
      } catch (error) {
        console.error("Error setting alarm:", error);
      }
    });
  });

  // Mark as Taken
  document.querySelectorAll(".taken-btn").forEach((button) => {
    button.addEventListener("click", async (event) => {
      const medicineCard = event.target.closest(".medicine-card");
      const medicineId = medicineCard.dataset.id;
      const scheduleTime = medicineCard.dataset.time;
      const medicineName = medicineCard.dataset.name;

      try {
        const response = await fetch(`/medicine/taken/${medicineId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ scheduleTime, medicineName }),
        });
        if (response.ok) {
          const result = await response.json(); // Get the response JSON data
          alert(result.message); // Show the message from the backend

          let remainingDosage = parseInt(
            medicineCard.querySelector(".remaining-dosage").textContent
          );
          remainingDosage -= 1;
          medicineCard.querySelector(".remaining-dosage").textContent =
            remainingDosage;

          window.location.reload();
        } else {
          const result = await response.json(); // Capture any error message from the backend
          alert(result.message); // Show the error message
        }
      } catch (error) {
        console.error("Error marking medicine as taken:", error);
      }
    });
  });
});

function SecurityKeyForSignUp() {
  const role = document.getElementById("role").value;
  const securityKeyContainer = document.getElementById("securityKeyContainer");
  if (role === "Doctor" && role === "Patient") {
    securityKeyContainer.style.display = "block";
    document.getElementById("securityKey").required = true;
  } else {
    securityKeyContainer.style.display = "none";
    document.getElementById("securityKey").required = false;
  }

  if (role === "Patient") {
    securityKeyContainer.style.display = "block";
    document.getElementById("securityKey").required = true;
  } else {
    securityKeyContainer.style.display = "none";
    document.getElementById("securityKey").required = false;
  }
}

window.onload = SecurityKeyForSignUp;

function SecurityKeyForLogin() {
  const role = document.getElementById("role").value;
  const securityKeyContainer = document.getElementById("securityKeyContainer");
  if (role === "Patient") {
    securityKeyContainer.style.display = "block";
    document.getElementById("securityKey").required = true;
  } else {
    securityKeyContainer.style.display = "none";
    document.getElementById("securityKey").required = false;
  }
}

window.onload = SecurityKeyForLogin;
