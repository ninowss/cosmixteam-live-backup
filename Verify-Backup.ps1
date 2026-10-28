$ErrorActionPreference = 'Stop'
$manifest = Get-Content -LiteralPath (Join-Path $PSScriptRoot 'manifest.json') -Raw | ConvertFrom-Json
$snapshotRoot = Join-Path $PSScriptRoot 'snapshot/cosmixteam'
$files = @(Get-ChildItem -LiteralPath $snapshotRoot -File -Recurse)
if ($files.Count -ne @($manifest).Count) { throw 'Snapshot file count differs from manifest.' }
foreach ($entry in $manifest) {
    $filePath = Join-Path $PSScriptRoot $entry.path
    $file = Get-Item -LiteralPath $filePath
    $actual = (Get-FileHash -LiteralPath $filePath -Algorithm SHA256).Hash.ToLowerInvariant()
    if ($file.Length -ne $entry.bytes -or $actual -ne $entry.sha256) {
        throw "Snapshot verification failed: $($entry.path)"
    }
}
$archive = Join-Path $PSScriptRoot 'archives/cosmixteam-live-20261028-2205-WIB.zip'
$archiveHash = (Get-FileHash -LiteralPath $archive -Algorithm SHA256).Hash.ToLowerInvariant()
if ($archiveHash -ne '26f431b94ffa9a04836bb26e12d4d3392155549bf29738c8613939e06ef0a1fa') {
    throw 'Original Hostinger ZIP checksum differs.'
}
Write-Output "Verified $($files.Count) snapshot files and the original Hostinger ZIP."
