export function mockBackend(path, method, body) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let users = JSON.parse(localStorage.getItem("taskmate_users")) || [];
      let services =
        JSON.parse(localStorage.getItem("taskmate_services")) || [];
      let bookings =
        JSON.parse(localStorage.getItem("taskmate_bookings")) || [];

      // AUTH: SIGNUP

      if (path === "/auth/signup" && method === "POST") {
        const exists = users.some((u) => u.email === body.email);

        if (exists) {
          return reject({ message: "Email already registered" });
        }

        const newUser = {
          id: Date.now(),
          ...body,
        };

        users.push(newUser);
        localStorage.setItem("taskmate_users", JSON.stringify(users));

        return resolve({
          token: "mock-token-" + newUser.id,
          user: newUser,
        });
      }

      // AUTH: LOGIN

      if (path === "/auth/login" && method === "POST") {
        const found = users.find(
          (u) => u.email === body.email && u.password === body.password
        );

        if (!found) {
          return reject({ message: "Invalid email or password" });
        }

        return resolve({
          token: "mock-token-" + found.id,
          user: found,
        });
      }

      // AUTH: ME

      if (path === "/auth/me" && method === "GET") {
        const token = localStorage.getItem("taskmate_token");
        if (!token) return reject({ message: "Not authenticated" });

        const id = token.replace("mock-token-", "");
        const user = users.find((u) => String(u.id) === String(id));

        if (!user) return reject({ message: "User not found" });

        return resolve({ user });
      }

      // PARTNER SERVICES: CREATE

      if (path === "/partner/services" && method === "POST") {
        const newService = {
          id: Date.now(),
          ...body,
        };

        services.push(newService);
        localStorage.setItem("taskmate_services", JSON.stringify(services));

        return resolve(newService);
      }

      // PARTNER SERVICES: LIST

      if (path.startsWith("/partner/services/") && method === "GET") {
        const partnerId = path.split("/").pop();
        const list = services.filter((s) => String(s.partnerId) === partnerId);

        return resolve({ services: list });
      }

      // PARTNER SERVICES: DELETE

      if (path.startsWith("/partner/services/") && method === "DELETE") {
        const id = path.split("/").pop();
        services = services.filter((s) => String(s.id) !== id);

        localStorage.setItem("taskmate_services", JSON.stringify(services));
        return resolve({ success: true });
      }

      // BOOKINGS: CREATE
      if (path === "/bookings" && method === "POST") {
        const newBooking = {
          id: Date.now(),
          status: "pending",
          ...body,
        };

        bookings.push(newBooking);
        localStorage.setItem("taskmate_bookings", JSON.stringify(bookings));

        return resolve(newBooking);
      }

      // BOOKINGS: GET FOR PARTNER
      if (path.startsWith("/partner/bookings/") && method === "GET") {
        const partnerId = path.split("/").pop();
        const list = bookings.filter((b) => String(b.partnerId) === partnerId);

        return resolve({ bookings: list });
      }

      // BOOKINGS: GET FOR CLIENT
      if (path.startsWith("/client/bookings/") && method === "GET") {
        const clientId = path.split("/").pop();
        const list = bookings.filter((b) => String(b.clientId) === clientId);

        return resolve({ bookings: list });
      }

      // BOOKINGS: UPDATE STATUS
      if (path.startsWith("/bookings/") && method === "PATCH") {
        const id = path.split("/").pop();
        const booking = bookings.find((b) => String(b.id) === id);

        if (!booking) return reject({ message: "Booking not found" });

        Object.assign(booking, body);

        localStorage.setItem("taskmate_bookings", JSON.stringify(bookings));
        return resolve(booking);
      }

      // UNKNOWN ENDPOINT
      reject({ message: "Unknown endpoint: " + path });
    }, 400);
  });
}
