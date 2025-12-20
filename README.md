<p align="center"><img src="https://media.forgecdn.net/avatars/798/822/638160732420962168.png" height="250" alt="Logo"></p>
<h1 align="center">PanPack</h1>
<p align="center"><b><i>A template for the modern modpacker, featuring automatic mod updating, autolinting, build/release scripts, simple setup and more.</i></b></p>
<h1 align="center">
    <a href="https://github.com/ThePansmith/PanPack/blob/main/LICENSE.md"><img src="https://img.shields.io/github/license/ThePansmith/PanPack?style=for-the-badge&logo=github" alt="License"></a>
    <a href="https://discord.com/invite/zwQzqP8b6q"><img src="https://img.shields.io/discord/927050775073534012?style=for-the-badge&logo=discord&color=5865F2&labelColor=grey&label=+" alt="Discord"></a>
</h1>

## Features
- Pakku:
   - Easily control mods and resourcepacks, handling dependendices for you.
      - Mods can be pulled from Curseforge, Modrinth, and even Github releases!
        - [Manual overrides work as well](https://juraj-hrivnak.github.io/Pakku/adding-manual-overrides.html)
      - Mods and folders can be easily marked as client or serverside only, or even to [not export at all](https://github.com/ThePansmith/PanPack/blob/cfda140750ebd454094415e32a4f971d49153428/pakku.json#L31C1-L34C10)!
   - Simultaneous Curseforge and Modrinth Modpack Support[^1]
   - Mods can be easily fetched (more on that below)
- Actions:
   - Autolinting
      - By default, will **automatically fix** any lint issues in the KubeJS folder, keeping your code organized hassle free.
         - This behavior can be easily changed as applicable, if you prefer it to check pull requests
      - Custom Rules for Recipe Spacing, Call Chains and GTm Multiblocks (and more) included
   - Autoupdating:
      - **Automatically sync your instance's mods** with the repository
      - **Automatically sync your instance's modloader version** (and more) with the repository
         - Supports Forge and NeoForge
   - Build and Release
      - Automatically builds on commit, and will push to curseforge on a version change (Serverpacks included)
      - Automatically Diffs Mods and Pull Requests, and attaches your changelog
      - Can replace text with the update number, useful for the main menu or loading screen.
      - Can publish a truncated changelog to discord if a webhook is provided.
- Other:
   - Very quick setup for contributors
   - VSC Workspace (in the .vscode folder)
   - Issue and PR templates
   - .gitignore (including some mod configs that add a last edited date)

### Requirements
* This template was written with [Prism Launcher](https://prismlauncher.org/) in mind. Those using other launchers will need to adjust setup instructions as needed to allow their launcher to recognize the template as an instance. Launchers without the ability to set prelaunch commands will need to fetch mods manually (see below).

## Setup
### As a template 
1. Clone your copy of this template into an empty [`(instancename)\minecraft`](https://github.com/user-attachments/assets/f9de6554-925d-4827-b51c-c7159e6f915f) folder
2. Copy the contents of `(instancename)\minecraft\.pakku\prism-overrides`[^2] into your `(instancename)` folder to have a working [Prism Instance](https://prismlauncher.org/).[^3]


By default, the pack comes with a set of mods most packdevs find useful (optimization mods, KubeJS, Jade, etc); To add your mods and resourcepacks, open the project's /minecraft/ folder in a terminal (using a code editor such as VSC is recommended), and run [`java -jar pakku.jar add [<options>] [<projects>]`](https://juraj-hrivnak.github.io/Pakku/managing-projects.html#adding-projects). Pakku will handle dependencies for you.

### Importing into an existing repository
1. In your existing minecraft instance's `/minecraft/` folder, ensure that you have one of the following available: `manifest.json` `modrinth.index.json` `.mrpack`, or a curseforge `.zip` file. [(You can generate one with Prism)](https://github.com/user-attachments/assets/88f3518d-604f-46d9-a319-775c6daa05cb)
2. Clone the panpack template somewhere, copy over everything but `pakku-lock.json` (and `.gitattributes` and .git folder, of course)
3. Open up your terminal, [change directory](https://www.wikihow.com/images/thumb/0/08/Change-Directories-in-Command-Prompt-Step-7-Version-2.jpg/v4-460px-Change-Directories-in-Command-Prompt-Step-7-Version-2.jpg.webp) to your instance's `/minecraft/` folder, and run [`java -jar pakku.jar import <file from step 1>`](https://juraj-hrivnak.github.io/Pakku/managing-projects.html#adding-projects)
4. Edit `minecraft/pakku.json`, and `minecraft/.pakku/prism-overrides/` as applicable, and add `java -jar pakku.jar fetch` to your instance's [prelaunch commands](https://github.com/user-attachments/assets/494a632d-1af4-453d-9329-5454ac3d22da)

Don't forget to link to this page in your README so contributors will know how to set up their own instance!

### Contributing to an existing repository that uses this template
1. Clone your fork of the repository into an empty [`(instancename)\minecraft`](https://github.com/user-attachments/assets/f9de6554-925d-4827-b51c-c7159e6f915f) folder, and copy the contents of `(instancename)\minecraft\.pakku\prism-overrides` into your `(instancename)` folder to have a working Prism Instance. From there, you can start your newly created instances and the mods will be downloaded for you.[^3]

#### Modloader Sync
   Those wanting to also automatically sync the modloader version should replace the [prelaunch command](https://github.com/user-attachments/assets/494a632d-1af4-453d-9329-5454ac3d22da) with one of the below commands instead.

  Windows:
  ```cmd
  cmd /c "java -jar pakku.jar fetch && copy /Y "$INST_MC_DIR\.pakku\prism-overrides\mmc-pack.json" "$INST_DIR\mmc-pack.json"
  ```
  Linux and MacOS
  ```bash
  java -jar pakku.jar fetch && cp -f "$INST_MC_DIR/.pakku/prism-overrides/mmc-pack.json" "$INST_DIR/mmc-pack.json"
  ```


### Building and releasing
Before you can run the buildscripts, you will need to go to the repository's [secrets and variables](https://docs.github.com/en/actions/how-tos/write-workflows/choose-what-workflows-do/use-secrets) and add [`CURSEFORGE_TOKEN`](https://support.curseforge.com/en/support/solutions/articles/9000197321-curseforge-upload-api) into secrets and [`CURSEFORGE_ID`](https://github.com/user-attachments/assets/39fc3911-ee6a-4152-a433-be166896d5cd) into variables. Before releasing, go to [release.yml](https://github.com/ThePansmith/PanPack/blob/main/.github/workflows/build-release.yml), and change anything that's commented with "Change this!"

Also, ensure that your pakku.json has the following variables:

```json
    "version": "DEV", // Leave this as dev, it will be replaced when the project is built. Don't include these comments in your actual pakku.json file.
    "release_type": "alpha", // or beta, or release. This one is used to tell curseforge the release type.
```

## Usage
* To initate a release, update `CHANGELOG.MD` with a new version, [Unreleased] can be used as a staging ground for changes.
   * [Unreleased] changes are included in the changelog for builds created from the dev branch.
* Release type, overrides, and otherwise can be set in pakku.json
* Give the workflow read/write permissions

## Notes
* This template supports automatically posting changelogs to discord: add a [discord webhook](https://support.discord.com/hc/en-us/articles/228383668-Intro-to-Webhooks) to your secrets with the name `discord-webhook` if you wish to enable that.
* Modloader syncs also works with your repository's Minecraft version and Modloader, niche as it may be.
   * Of course, they also work across branches, and can be disabled if you need to test something. 
* Some of the linting rules are disabled by default, you can enable them (or even add your own!) by editing `custom-plugin.mjs`.
* By default, the changes on the `main` and `dev` branches are built, branch names and behavior can be adjusted in the buildscript.
* Those wishing to handle linting on their end can use the [precommit hook](https://github.com/ThePansmith/Monifactory/blob/main/CONTRIBUTING.md#kubejs-style-guide) to run eslint automatically.

<!-- #### I need a Curseforge Key?
Accessing CurseForge requires the CurseForge API key.

The API key can be generated in the CurseForge for Studios(https://console.curseforge.com/) developer console.

 1. Login to the developer console
 2. Go to the "API keys" tab
 3. Copy your API key
 4. Run `java -jar pakku.jar credentials set --cf-api-key '(API Key)'` in your `minecraft` folder via your terminal (to get to the folder, use the [cd](https://en.wikipedia.org/wiki/Cd_(command)) command). -->


## Credits
- Buildscript modified from [Terrafirmagreg](https://www.curseforge.com/minecraft/modpacks/terrafirmagreg-modern)

[^1]: Modrinth buildscripts are disabled by default, as most pack developers do not plan on releasing to modrinth due to important mods not being present, but can be easily uncommented if you do. If so, also add a `MODRINTH_TOKEN` and `MODRINTH_ID` secret and variable.
[^2]: The included `mmc-pack` is for forge 1.20.1, edit/replace `mmc-pack` with your own if on another version when initially setting up, just remember to add `PreLaunchCommand=java -jar pakku.jar fetch` to it. The repository will automatically update the `mmc-pack` in `prism-overrides` based on your pakku.lock when you push.
[^3]: In the event that the prelaunch fetch command isn't automatically applied, simply just add `java -jar pakku.jar fetch` (or one of it's varients) to your instance's [prelaunch commands](https://github.com/user-attachments/assets/494a632d-1af4-453d-9329-5454ac3d22da) manually.
