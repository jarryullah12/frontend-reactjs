{pkgs}: {
  channel = "stable-24.05";
  packages = [
<<<<<<< HEAD
    pkgs.nodejs_22
  ];
  idx.extensions = [
    "svelte.svelte-vscode",
=======
    pkgs.nodejs_20
  ];
  idx.extensions = [
    "svelte.svelte-vscode"
>>>>>>> 07dd0a11ae9f46469c2ac6c1ac6bcd9d788fc742
    "vue.volar"
  ];
  idx.previews = {
    previews = {
      web = {
        command = [
<<<<<<< HEAD
          "npm",
          "run",
          "dev",
          "--",
          "--port",
          "$PORT",
          "--host",
=======
          "npm"
          "run"
          "dev"
          "--"
          "--port"
          "$PORT"
          "--host"
>>>>>>> 07dd0a11ae9f46469c2ac6c1ac6bcd9d788fc742
          "0.0.0.0"
        ];
        manager = "web";
      };
    };
  };
}